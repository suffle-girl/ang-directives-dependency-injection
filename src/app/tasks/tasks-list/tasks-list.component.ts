import { Component, computed, inject, signal } from "@angular/core";

import { TaskItemComponent } from "./task-item/task-item.component";
import { TasksServiceToken } from "../../../main";
import { TASKS_STATUS_OPTION, taskStatusOptionsProvider } from "../task.model";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  templateUrl: "./tasks-list.component.html",
  styleUrl: "./tasks-list.component.css",
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);
  private selectedFilter = "all";
  taskStatusOptions = inject(TASKS_STATUS_OPTION);

  get tasks() {
    switch (this.selectedFilter) {
      case "open":
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === "OPEN");
      case "in-progress":
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === "IN_PROGRESS");
      case "done":
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === "DONE");
      default:
        return this.tasksService.allTasks();
    }
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter = filter;
  }
}
