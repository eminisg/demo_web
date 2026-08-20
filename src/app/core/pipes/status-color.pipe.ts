import { Pipe, PipeTransform } from '@angular/core';
import {TodoStatus} from '../const/enums';


@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {
  private readonly colorMap: Record<TodoStatus, string> = {
    PENDING: 'bg-warning',     // Желтый / Amber
    TODO: 'bg-secondary',        // Серый
    IN_PROGRESS: 'bg-primary', // Синий
    DONE: 'bg-success'         // Зеленый
  };

  transform(status: TodoStatus | string | null | undefined, defaultColor: string = 'bg-dark'): string {
    if (!status) {
      return defaultColor;
    }

    return this.colorMap[status as TodoStatus] || defaultColor;
  }
}
