import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  // non-signal version
  tasks: Task[] = [];
  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      title: taskData.title,
      description: taskData.description,
      id: Math.random().toString(),
      status: "OPEN",
    };
    this.tasks = [...this.tasks, newTask];
  }

  // signal version
  tasks2 = signal<Task[]>([]);
  addTask2(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: "OPEN",
    };
    this.tasks2.update((oldTasks) => [...oldTasks, newTask]);
  }
}
