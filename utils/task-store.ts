import Datastore from "@seald-io/nedb";
import { TaskType } from "./types";

const db = new Datastore({ filename: "./data/tasks.db", autoload: true });

class TaskStore {
    add(title: string, importance: string, description: string, dueDate: string, done: boolean, callback: (err: any, doc: any) => void) {
        const task = {
            title: title,
            importance: this.getImportance(Number(importance)),
            description: description,
            creationDate: new Date(),
            dueDate: new Date(dueDate).toLocaleDateString(),
            done: done,
        } as TaskType;
        db.insert(task, function (err, doc) {
            callback(err, doc);
        });
    }

    delete(id: number, callback: (err: any, doc: any) => void) {
        db.remove({ _id: id }, {}, function (err, numRemoved) {
            callback(err, numRemoved);
        });
    }

    get(id: number, callback: (err: any, doc: any) => void) {
        db.findOne({ _id: id }, function (err, doc) {
            callback(err, doc);
        });
    }

    getAll(callback: (err: any, doc: any) => void) {
        db.find({}, function (err: any, docs: any) {
            callback(err, docs);
        });
    }
    private getImportance(importance: number): string {
        switch (importance) {
            case 1:
                return "Low";
            case 2:
                return "Medium";
            case 3:
                return "High";
            case 4:
                return "Urgent";
        }
        return "Unknown";
    }
}

export const taskStore = new TaskStore();
