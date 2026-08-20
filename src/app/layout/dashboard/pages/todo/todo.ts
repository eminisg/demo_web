import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoService} from '../../../../core/todo.service';
import {HttpResourceRef} from '@angular/common/http';
import {PageableInterface} from '../../../../core/interfaces/pageable.interface';
import {TodoRequestInterface, TodoResponseInterface} from '../../../../core/interfaces/todo.interface';
import {DatePipe, NgClass} from '@angular/common';
import {StatusColorPipe} from '../../../../core/pipes/status-color.pipe';
import {EMPTY, finalize, switchMap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TodoModal} from '../../components/todo-modal/todo-modal';

@Component({
  selector: 'app-todo',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    StatusColorPipe,
    NgClass
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  readonly dialog = inject(MatDialog);
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

  protected deleteTodo(id: number) {
    this.todoService.deleteTodo(id).pipe(
      finalize(() => {
        this.todoList.reload();
      })
    ).subscribe({
      next: (res)=> {
      }
    });
  }

  protected openModal(todo?: TodoRequestInterface) {
    const dialogRef = this.dialog.open(TodoModal,{
      data: { todo },
      width: '50vw',
    });

    dialogRef.afterClosed().pipe(
      switchMap((todoData: any) => {
        if (!todoData) return EMPTY;
        if(todoData?.id) {
          return this.todoService.updateTodo(todoData);
        } else {
          return this.todoService.createTodo(todoData);
        }
      })
    ).subscribe(result => {
      this.todoList.reload();
    });
  }
}
