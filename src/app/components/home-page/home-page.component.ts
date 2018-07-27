import { Component, OnInit } from '@angular/core';
import {VideosService} from '../../services/videos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  videos = this.videoService.videos;
  isLoadingVideos = false;
  constructor(private videoService: VideosService) {}

  ngOnInit() {
    if (this.videos.length === 0) {
      this.loadVideo();
    }
  }

  loadVideo() {
    this.isLoadingVideos = true;
    this.videoService.getVideosFromYouTube((videos) => this.videos = videos);
    setTimeout(() => {
      this.isLoadingVideos = false;
    }, 500);
  }
}
