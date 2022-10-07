import { giphyGif } from "./gif";

export interface giphySearchResponse {
  data: Array<giphyGif>;
  meta: any;
  pagination: any;
}