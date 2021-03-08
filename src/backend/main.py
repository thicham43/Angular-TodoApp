from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import psycopg2 as pg
from datetime import date as d

app = Flask(__name__)
CORS(app)

DB_HOST = "localhost"
DB_NAME = "angulartodos"
DB_USER = "openpg"
DB_PASSWORD = "openpgpwd"
TABLE_NAME = "task"
TABLE_COLUMNS = ('id', 'title', 'details', 'date', 'is_done')


def open_pg_connexion():
    return pg.connect(host = DB_HOST, database = DB_NAME,
                      user = DB_USER, password = DB_PASSWORD)

@app.route('/tasks')
def get_tasks(task_ids = []):
    conn = open_pg_connexion()
    cur = conn.cursor()

    q = "SELECT %s FROM %s ORDER BY id" % (", ".join(TABLE_COLUMNS), TABLE_NAME)
    if task_ids:
        q = q.replace("ORDER BY", "WHERE id IN (%s) ORDER BY" % (",".join(map(str, task_ids))))
    cur.execute(q)
    tasks = [ dict(zip(TABLE_COLUMNS, t)) for t in cur.fetchall() ]
    for t in tasks:
        t["date"] = t["date"].strftime("%Y-%m-%d")
    
    cur.close()
    conn.close()
    return jsonify(tasks)


@app.route('/tasks/<int:task_id>')
def get_task(task_id):
    return get_tasks(task_ids=[task_id])


@app.route('/task/new', methods=['POST'])
def add_task():
    conn = open_pg_connexion()
    cur = conn.cursor()
    
    vals = json.loads(request.data.decode('UTF-8'))
    q = """ INSERT INTO %s(%s) VALUES (%s) RETURNING id
        """ % (TABLE_NAME, ", ".join(vals.keys()), ", ".join(map(lambda s: "'%s'" % s, vals.values())))
    
    cur.execute(q)
    new_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return get_task(new_id)


@app.route('/task/update/<int:task_id>', methods=['POST'])
def update_task(task_id):
    def prepare_set_clause(d):
        return ", ".join([("%s = '%s'" if isinstance(d[k], str) else "%s = %s") % (k, d[k]) for k in d])
        
    conn = open_pg_connexion()
    cur = conn.cursor()

    vals = json.loads(request.data.decode('UTF-8'))
    vals.pop('id', None)
    q = "UPDATE %s set %s WHERE id = %s" % (TABLE_NAME, prepare_set_clause(vals), task_id)

    cur.execute(q)
    conn.commit()
    cur.close()
    conn.close()
    return get_task(task_id)

@app.route('/task/delete', methods=['POST'])
def delete_task():
    conn = open_pg_connexion()
    cur = conn.cursor()
    data = json.loads(request.data.decode('UTF-8'))
    cur.execute("DELETE FROM %s WHERE id = %s" % (TABLE_NAME, data.get('task_id')))
    conn.commit()
    cur.close()
    conn.close()
    return get_tasks()


if __name__ == '__main__':
    app.run()