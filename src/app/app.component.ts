import {Component, HostListener, OnInit} from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private breakpoint = 768;
  webView: string;

  ngOnInit() {
    this.onResize();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.webView = window.innerWidth > this.breakpoint ? 'desktop' : 'mobile';
  }
}
