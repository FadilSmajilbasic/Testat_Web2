import Datastore from "@seald-io/nedb";
import { TaskType } from "./types";

const db = new Datastore({ filename: "./data/tasks.db", autoload: true });

class TaskStore {
    add(title: string, importance: string, description: string, dueDate: string, callback: (err: any, task: any) => void) {
        const task = {
            title: title,
            importance: this.getImportance(Number(importance)),
            description: description,
            creationDate: new Date(),
            dueDate: new Date(dueDate).toLocaleDateString(),
            done: false,
        } as TaskType;
        db.insert(task, function (err, task) {
            callback(err, task);
        });
    }

    delete(id: number, callback: (err: any, task: any) => void) {
        db.remove({ _id: id }, {}, function (err, numRemoved) {
            callback(err, numRemoved);
        });
    }

    get(id: number, callback: (err: any, task: any) => void) {
        db.findOne({ _id: id }, function (err, task) {
            callback(err, task);
        });
    }

    getAll(callback: (err: any, task: any) => void) {
        db.find({}, function (err: any, docs: any) {
            callback(err, docs);
        });
    }
    private getImportance(importance: number): string {
        switch (importance) {
            case 0:
                return "Low";
            case 1:
                return "Medium";
            case 2:
                return "High";
            case 3:
                return "Urgent";
        }
        return "Unknown";
    }

    update(
        id: number,
        title: string,
        importance: string,
        description: string,
        dueDate: string,
        done: boolean,
        callback: (err: any, task: any) => void
    ) {
        const task = {
            title: title,
            importance: this.getImportance(Number(importance)),
            description: description,
            creationDate: new Date(),
            dueDate: new Date(dueDate).toLocaleDateString(),
            done: done,
        } as TaskType;

        db.update({ _id: id }, task, {}, function (err, numReplaced) {
            callback(err, numReplaced);
        });
    }
}

export const taskStore = new TaskStore();
