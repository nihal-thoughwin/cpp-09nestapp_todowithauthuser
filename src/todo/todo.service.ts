import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repo/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserService } from 'src/user/user.service';

//todos api
//add todos based on user id
//find all todos based on userid(not completed)
//find all completed todos based on userid(completed)
//mark todo as completed based on todoid
//delete todo as based on todoid

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
    private userServise: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    // return 'This action adds a new todo';
    const todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userServise.findUserbyId(userId);
    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    // return `This action returns all todo`;
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllTodoByUserCompleted(userId: number) {
    // return `This action returns all todo`;
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} todo`;
  // }

  update(todoId: number) {
    // return `This action updates a #${id} todo`;
    return this.todoRepository.update(todoId, { completed: true });
  }

  remove(todoId: number) {
    // return `This action removes a #${id} todo`;
    return this.todoRepository.delete(todoId);
  }
}
