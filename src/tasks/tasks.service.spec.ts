import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('creates a task', () => {
    const task = service.create({ title: 'Test', description: 'Desc' });
    expect(task.title).toBe('Test');
    expect(task.description).toBe('Desc');
    expect(task.isDone).toBe(false);
    expect(service.findAll()).toHaveLength(1);
  });

  it('finds a task by id', () => {
    const task = service.create({ title: 'Find me' });
    const found = service.findOne(task.id);
    expect(found).toEqual(task);
  });

  it('updates a task', () => {
    const task = service.create({ title: 'Old' });
    const updated = service.update(task.id, { title: 'New', isDone: true });
    expect(updated.title).toBe('New');
    expect(updated.isDone).toBe(true);
  });

  it('removes a task', () => {
    const task = service.create({ title: 'To remove' });
    service.remove(task.id);
    expect(service.findAll()).toHaveLength(0);
  });

  it('throws when task not found', () => {
    expect(() => service.findOne('bad')).toThrow(NotFoundException);
    expect(() => service.update('bad', { title: 'nope' })).toThrow(NotFoundException);
    expect(() => service.remove('bad')).toThrow(NotFoundException);
  });
});
