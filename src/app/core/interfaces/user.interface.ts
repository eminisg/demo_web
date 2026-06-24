import {ImageInterface} from './image.interface';

export interface UserInterface {
  "username": String,
  "email": String,
  "id": number,
  "role": "USER" | "ADMIN",
  profileImg: ImageInterface
}

