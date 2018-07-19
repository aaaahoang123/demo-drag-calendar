import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent implements OnInit {
  link = 'https://www.youtube.com/embed/';
  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private location: Location) { }

  ngOnInit() {
    this.link += this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.location.back();
  }
}
