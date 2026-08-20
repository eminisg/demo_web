import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PageableInterface} from './interfaces/pageable.interface';
import {TodoPostRequestInterface, TodoResponseInterface} from './interfaces/todo.interface';

const URLS = {
  todo_list: `${environment.apiRoot}/todo/todo-list`,
  create_todo: `${environment.apiRoot}/todo/create-todo`,
  update_todo: `${environment.apiRoot}/todo/update-todo`,
  delete_todo: `${environment.apiRoot}/todo/delete-todo`,
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

  updateTodo(body: TodoPostRequestInterface) {
    return this.httpClient.put(URLS.update_todo, body);
  }

  deleteTodo(id: number) {
    return this.httpClient.delete(`${URLS.delete_todo}/${id}`);
  }
}
