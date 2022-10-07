import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { giphyGif } from '../models/interfaces/giphy/gif';
import { giphySearchResponse } from '../models/interfaces/giphy/search-response';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private apiKey: string = 'nmnofz9R8bdcVbFfvjVuWn5nyIRBypul';
  private searchApiEndpoint: string = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`;

  private httpOptions = { responseType: 'json' as const };

  public gifList: Map<number, Array<giphyGif>> = new Map<number, Array<giphyGif>>();

  public isRequesting: boolean = false;
  public pagination: any = null;
  private lastQuery: string = '';

  constructor(private httpClient: HttpClient,
  ) { 
  }

  public getGifs(query: string = '') {
    this.getGifsForPage(query);
  }

  public getGifsForPage(query: string = '', pageNumber: number = 0, limit: number = 9) {
    console.log('getGifsForPage -> ', query, pageNumber, limit);
    
    if (this.lastQuery === query && this.gifList.has(pageNumber)) {
      return;
    }

    if (this.lastQuery !== query) {
      this.gifList = new Map<number, Array<giphyGif>>();
      this.lastQuery = query;
    }

    this.isRequesting = true;

    let offsetStr = '';
    
    if (this.pagination) {
      const tempOffset = (pageNumber) * limit; //this.pagination.count + this.pagination.offset;
      const nextOffset = Math.min(this.pagination.total_count, tempOffset);

      limit = Math.min(this.pagination.total_count - nextOffset, limit);

      offsetStr = `&offset=${nextOffset}`;
    } else {
      offsetStr = '';
    }
    
    const limitStr = `&limit=${limit}`;

    let url: string = `${this.searchApiEndpoint}&q=${query}${limitStr}${offsetStr}`;

    let obs = this.httpClient.get<giphySearchResponse>(url, this.httpOptions).pipe(catchError(this.errorHandler));

    obs.subscribe(
      resp => {
        if (resp && resp.data && resp.data.length) {
          this.gifList.set(pageNumber, resp.data);
          this.pagination = resp.pagination;
          this.isRequesting = false;
        }
      }
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
