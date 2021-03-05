export class Task {
    constructor(public id: number,
                public title: string,
                public details: string,
                public date: Date,
                public is_done: boolean) { }
}


/* export interface Task {
                        id: number;
                        title: string;
                        details: string;
                        date: Date;
                        is_done: boolean;
                    } */