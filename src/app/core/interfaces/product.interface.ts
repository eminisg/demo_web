import {UserInterface} from './user.interface';
import {ImageInterface} from './image.interface';

export interface ProductInterface     {
  "id": number,
  "name": string,
  "description": string,
  "price": number,
  "seller": UserInterface,
  "stockQuantity": number,
  "images": ImageInterface[],
  "category": CategoryInterface,
}

export interface CategoryInterface {
  "id": number,
  "name": string,
}
