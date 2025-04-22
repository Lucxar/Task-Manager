// src/tasks/task.entity.ts

import { v4 as uuidv4 } from 'uuid';


export class Task {
  id: string;
  title: string;
  description?: string;
  isDone: boolean;
  createdAt: Date;

  constructor(title: string, description?: string) {
    this.id = uuidv4();         
    this.title = title;           
    this.description = description; 
    this.isDone = false;            
    this.createdAt = new Date();    
  }
}
