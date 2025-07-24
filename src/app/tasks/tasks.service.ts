import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

// @Injectable({
//   providedIn: "root",
// })
export class TasksService {
  private loggingService = inject(LoggingService);

  // non-signal version
  tasks2: Task[] = [];
  addTask2(taskData: { title: string; description: string }) {
    const newTask: Task = {
      title: taskData.title,
      description: taskData.description,
      id: Math.random().toString(),
      status: "OPEN",
    };
    this.tasks2 = [...this.tasks2, newTask];
    this.loggingService.log("ADDED TASK with title " + taskData.title);
  }

  // signal version
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: "OPEN",
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log("ADDED TASK with title " + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log("CHANGE TASK STATE " + newStatus);
  }
}
