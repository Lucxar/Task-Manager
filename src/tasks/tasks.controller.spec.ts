import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('creates and lists tasks', () => {
    const task = controller.create({ title: 'Test' });
    const tasks = controller.findAll();
    expect(tasks).toEqual([task]);
  });

  it('retrieves a task', () => {
    const task = controller.create({ title: 'Find' });
    const found = controller.findOne(task.id);
    expect(found).toEqual(task);
  });

  it('updates a task', () => {
    const task = controller.create({ title: 'Old' });
    const updated = controller.update(task.id, { isDone: true });
    expect(updated.isDone).toBe(true);
  });

  it('removes a task', () => {
    const task = controller.create({ title: 'Del' });
    controller.remove(task.id);
    expect(controller.findAll()).toHaveLength(0);
  });
});
