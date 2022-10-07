import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.scss']
})
export class GifGridComponent implements OnInit {

  public query: string = 'test';
  public pageIndex: number = 0;

  public readonly pageSize: number = 9;

  @ViewChild('searchInput') search: ElementRef | undefined;
  
  constructor(public giphyService: GiphyService,
  ) {
  }

  public pageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.getGifsForPage(pageEvent.pageIndex);
  }

  public getGifs() {
    this.giphyService.getGifs(this.query);
    this.search?.nativeElement.blur();
  }

  public getGifsForPage(pageNumber: number) {
    this.giphyService.getGifsForPage(this.query, pageNumber);
  }

  ngOnInit(): void {
  }

}
