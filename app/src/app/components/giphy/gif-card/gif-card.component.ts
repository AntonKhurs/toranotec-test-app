import { Component, Input, OnInit } from '@angular/core';
import { giphyGif } from 'src/app/models/interfaces/giphy/gif';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.scss']
})
export class GifCardComponent implements OnInit {

  @Input()
  public gif: giphyGif | undefined;

  constructor(
  ) {
    
  }

  ngOnInit(): void {
    console.log('GifCardComponent -> onInit');
  }

}
