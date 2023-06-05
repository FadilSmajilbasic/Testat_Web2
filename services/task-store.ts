import Datastore from "@seald-io/nedb";
import { TaskType } from "../utils/types";

const db = new Datastore({ filename: "./data/tasks.db", autoload: true });

class TaskStore {
    add(task: TaskType, callback: (err: any, task: any) => void) {
        db.insert(task, callback);
    }

    delete(id: string, callback: (err: any, task: any) => void) {
        db.remove({ _id: id }, {}, callback);
    }

    get(id: string, callback: (err: any, task: any) => void) {
        db.findOne({ _id: id }, callback);
    }

    getAll(callback: (err: any, task: any) => void, filterCompleted = false) {
        if (filterCompleted) {
            db.find({ done: filterCompleted }, callback);
        } else {
            db.find({}, callback);
        }
    }

    update(task: TaskType, callback: (err: any, task: any) => void) {
        db.update({ _id: task.id }, task, {}, callback);
    }
}

export const taskStore = new TaskStore();
