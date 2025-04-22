import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { Task } from './task.entity';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('tasks')
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    
    @Post()
    @ApiOperation({ summary: 'Erstellt einen neuen Task' })
    create(@Body() createTaskDto: CreateTaskDto): Task {
      return this.tasksService.create(createTaskDto);
    }
  
    
    @Get()
    @ApiOperation({ summary: 'Gibt alle Tasks zurück' })
    findAll(): Task[] {
      return this.tasksService.findAll();
    }
  
    
    @Get(':id')
    @ApiOperation({ summary: 'Gibt einen Task anhand seiner ID zurück' })
    findOne(@Param('id') id: string): Task {
      return this.tasksService.findOne(id);
    }
  
    
    @Patch(':id')
    @ApiOperation({ summary: 'Aktualisiert einen Task anhand seiner ID' })
    update(
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ): Task {
      return this.tasksService.update(id, updateTaskDto);
    }
  
    
    @Delete(':id')
    @ApiOperation({ summary: 'Löscht einen Task anhand seiner ID' })
    remove(@Param('id') id: string): void {
      return this.tasksService.remove(id);
    }
  }
  