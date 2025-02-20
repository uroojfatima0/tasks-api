import { Injectable, NotFoundException } from '@nestjs/common';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
  private readonly FILE_PATH = 'tasks.json';
  private tasks: any[] = [];

  constructor() {
    this.loadTasksFromFile(); // Load tasks when the service initializes
  }

  // ✅ Load tasks from JSON file
  private loadTasksFromFile(): void {
    if (existsSync(this.FILE_PATH)) {
      const data = readFileSync(this.FILE_PATH, 'utf8');
      this.tasks = JSON.parse(data);
    }
  }

  // ✅ Save tasks to JSON file
  private saveTasksToFile(): void {
    writeFileSync(this.FILE_PATH, JSON.stringify(this.tasks, null, 2), 'utf8');
  }

  // ✅ Get all tasks
  getTasks(): any {
    return this.tasks;
  }

  // ✅ Get task by ID
  getTaskById(id: string): any {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // ✅ Create a new task
  createTask(title: string, description: string): any {
    const newTask: any = { id: uuidv4(), title, description, completed: false };
    this.tasks.push(newTask);
    this.saveTasksToFile(); // Save to file
    return newTask;
  }

  // ✅ Update a task
  updateTask(id: string, title: string, description: string, completed: boolean): any {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new NotFoundException(`Task with ID ${id} not found`);

    this.tasks[taskIndex] = { id, title, description, completed };
    this.saveTasksToFile(); // Save to file
    return this.tasks[taskIndex];
  }

  // ✅ Delete a task
  deleteTask(id: string): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new NotFoundException(`Task with ID ${id} not found`);

    this.tasks.splice(taskIndex, 1);
    this.saveTasksToFile(); // Save to file
  }
}
