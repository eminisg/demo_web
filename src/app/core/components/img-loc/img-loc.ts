import {Component, effect, input, InputSignal, OnChanges, SimpleChanges} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-img-loc',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './img-loc.html',
  styleUrl: './img-loc.scss',
})
export class ImgLoc {

  imgData: InputSignal<any | undefined> = input()

  protected readonly environment = environment;

}
