import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../../../../core/todo.service';
import { TodoRequestInterface } from '../../../../core/interfaces/todo.interface';
import { TodoStatus } from '../../../../core/const/enums';

@Component({
  selector: 'app-todo-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-modal.html',
  styleUrl: './todo-modal.scss',
})
export class TodoModal {
  protected readonly data = inject<Partial<{todo: TodoRequestInterface}>>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<TodoModal>);
  private readonly fb = inject(FormBuilder);
  protected readonly todoService = inject(TodoService);

  readonly statusList = Object.values(TodoStatus);

  readonly form = this.createForm();

  private createForm() {
    const todo = this.data.todo as TodoRequestInterface;

    if (todo) {
      return this.fb.group({
        id: [todo.id, Validators.required],
        status: [todo.status ?? TodoStatus.TODO, Validators.required],
        title: [todo.title, Validators.required],
        description: [todo.description, Validators.required],
      });
    }

    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const todo = this.data.todo as TodoRequestInterface;

    const body: TodoRequestInterface = {
      ...formValue,
      ...(todo?.id ? { id: todo.id } : {}),
    } as TodoRequestInterface;

    this.dialogRef.close(body);
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
