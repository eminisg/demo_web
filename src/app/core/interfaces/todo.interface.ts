import {TodoStatus} from '../const/enums';

export interface TodoResponseInterface {
  id: number,
  title: string,
  description: string,
  createDate: Date,
  updateDate?: Date,
  status: TodoStatus,
}

export interface TodoRequestInterface {
  id?: number,
  title: string,
  description: string,
  status?: TodoStatus,
}

export interface TodoPostRequestInterface {

}
