import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PageableInterface} from './interfaces/pageable.interface';
import {TodoPostRequestInterface, TodoResponseInterface} from './interfaces/todo.interface';

const URLS = {
  todo_list: `${environment.apiRoot}/todo/todo-list`,
  create_todo: `${environment.apiRoot}/todo/create-todo`,
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private httpClient = inject(HttpClient);

  todoList: HttpResourceRef<PageableInterface<TodoResponseInterface> | undefined> = httpResource(() => URLS.todo_list);

  createTodo(body: TodoPostRequestInterface) {
   return this.httpClient.post(URLS.create_todo, body);
  }
}
