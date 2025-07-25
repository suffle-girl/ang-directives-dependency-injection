import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";

type TaskStatusOptions = {
  value: "open" | "in-progress" | "done";
  taskStatus: TaskStatus;
  text: string;
};

export const TASKS_STATUS_OPTION = new InjectionToken<TaskStatusOptions[]>(
  "task-status-option"
);

export const TaskStatusOptions: TaskStatusOptions[] = [
  {
    value: "open",
    taskStatus: "OPEN",
    text: "Open",
  },
  {
    value: "in-progress",
    taskStatus: "IN_PROGRESS",
    text: "In-Progress",
  },
  {
    value: "done",
    taskStatus: "DONE",
    text: "Completed",
  },
];

export const taskStatusOptionsProvider: Provider = {
  provide: TASKS_STATUS_OPTION,
  useValue: TaskStatusOptions,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
