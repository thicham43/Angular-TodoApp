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

TASK_SCHEMA = ('id', 'title', 'details', 'date', 'is_done')


def open_pg_connexion():
    return pg.connect(host = DB_HOST, database = DB_NAME,
                      user = DB_USER, password = DB_PASSWORD)


@app.route('/tasks')
def get_tasks(task_ids = []):
    # fetching tasks records from db
    conn = open_pg_connexion()
    cur = conn.cursor()

    q = "SELECT %s FROM %s ORDER BY id" % (", ".join(TASK_SCHEMA), TABLE_NAME)
    if task_ids:
        q = q.replace("ORDER BY", "WHERE id IN (%s) ORDER BY" % (",".join(map(str, task_ids))))
    
    cur.execute(q)
    tasks = [ dict(zip(TASK_SCHEMA, t)) for t in cur.fetchall() ]
    for t in tasks:
        t["date"] = t["date"].strftime("%Y-%m-%d")
    if len(tasks) == 1:
        tasks = tasks[0]
    
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
    q = """ INSERT INTO %s(%s) VALUES ('%s', '%s', '%s') RETURNING id
        """ % (TABLE_NAME, ", ".join(TASK_SCHEMA[1:-1]), vals['title'],vals['details'], vals['date'])

    cur.execute(q)
    new_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    conn.close()
    return get_task(new_id)




if __name__ == '__main__':
    app.run()