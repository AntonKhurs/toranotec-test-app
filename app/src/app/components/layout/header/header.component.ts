import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public giphyService: GiphyService,
  ) {

  }

  public callGiphyService() {
    console.log('callGiphyService');
    this.giphyService.getGifs('test');
  }

  ngOnInit(): void {
    console.log('HeaderComponent -> onInit');
  }

}
