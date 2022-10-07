import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';
import { PageEvent } from '@angular/material/paginator';
import { giphyGif } from 'src/app/models/interfaces/giphy/gif';

@Component({
  selector: 'app-gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.scss']
})
export class GifGridComponent implements OnInit {

  public query: string = 'test';
  public pageIndex: number = 0;

  public readonly pageSize: number = 9;

  constructor(public giphyService: GiphyService,
  ) {
  }

  public pageEvent(pageEvent: PageEvent) {
    console.log('pageEvent -> ', pageEvent);
    this.pageIndex = pageEvent.pageIndex;
    this.getGifsForPage(pageEvent.pageIndex);
  }

  public getGifs() {
    console.log('getGifs ->');
    this.giphyService.getGifs(this.query);
  }

  public getGifsForPage(pageNumber: number) {
    console.log('getGifsForPage -> ', pageNumber);
    this.giphyService.getGifsForPage(this.query, pageNumber);
  }

  ngOnInit(): void {
    console.log('GifGridComponent -> onInit');
  }

}
