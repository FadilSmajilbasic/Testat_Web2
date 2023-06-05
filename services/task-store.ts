import Datastore from "@seald-io/nedb";
import { TaskType } from "../utils/types";

const db = new Datastore({ filename: "./data/tasks.db", autoload: true });

class TaskStore {
    add(task: TaskType, callback: (err: any, task: any) => void) {
        db.insert(task, function (err, task) {
            callback(err, task);
        });
    }

    delete(id: string, callback: (err: any, task: any) => void) {
        db.remove({ _id: id }, {}, function (err, numRemoved) {
            callback(err, numRemoved);
        });
    }

    get(id: string, callback: (err: any, task: any) => void) {
        db.findOne({ _id: id }, function (err, task) {
            callback(err, task);
        });
    }

    getAll(callback: (err: any, task: any) => void, filterCompleted = false) {
        if (filterCompleted) {
            db.find({ done: filterCompleted }, function (err: any, docs: any) {
                callback(err, docs);
            });
        } else {
            db.find({}, function (err: any, docs: any) {
                callback(err, docs);
            });
        }
    }

    update(task: TaskType, callback: (err: any, task: any) => void) {
        db.update({ _id: task.id }, task, {}, function (err, numReplaced) {
            callback(err, numReplaced);
        });
    }
}

export const taskStore = new TaskStore();
