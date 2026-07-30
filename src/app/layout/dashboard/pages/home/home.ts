import {Component, inject} from '@angular/core';
import {TodoService} from '../../../../core/todo.service';
import {HttpClient, HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from '../../../../core/interfaces/pageable.interface';
import {TodoPostRequestInterface, TodoResponseInterface} from '../../../../core/interfaces/todo.interface';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly fb = inject(FormBuilder);
  todoService: TodoService = inject(TodoService);
  form = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  todoList: HttpResourceRef<PageableInterface<TodoResponseInterface> | undefined> = this.todoService.todoList;

  constructor() {
    this.todoList.reload();
  }

  protected submit() {
    const body = this.form.value as TodoPostRequestInterface;
    this.todoService.createTodo(body).subscribe(()=> {
      this.todoList.reload();
    })
  }
}
