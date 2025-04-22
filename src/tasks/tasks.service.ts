import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];


  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task = new Task(title, description);
    this.tasks.push(task);
    return task;
  }


  findAll(): Task[] {
    return this.tasks;
  }


  findOne(id: string): Task {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task mit ID "${id}" nicht gefunden`);
    }
    return task;
  }


  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    const { title, description, isDone } = updateTaskDto;
    if (title !== undefined)      task.title       = title;
    if (description !== undefined) task.description = description;
    if (isDone !== undefined)     task.isDone      = isDone;
    return task;
  }


  remove(id: string): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task mit ID "${id}" nicht gefunden`);
    }
    this.tasks.splice(index, 1);
  }
}
