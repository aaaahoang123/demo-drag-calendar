import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private url = 'https://content.googleapis.com/youtube/v3/search?videoEmbeddable=true&maxResults=12&' +
    'type=video&videoSyndicated=true&part=snippet&key=AIzaSyBStdhzhkK8ne1tqsUz4A8j9axNi0NqE_M';
  videos = [];
  token = '';
  constructor(private http: HttpClient) { }
  getVideosFromYouTube(callback: any): void {
    let theUrl = this.url;
    if (this.token) {
      theUrl += `&pageToken=${this.token}`;
    }
    this.http.get<any>(theUrl).subscribe(res => {
      this.videos = [...this.videos, ...res.items];
      this.token = res.nextPageToken;
      console.log(this.videos);
      callback(this.videos);
    });
  }
}
