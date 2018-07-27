import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-screen-navbar',
  templateUrl: './big-screen-navbar.component.html',
  styleUrls: ['./big-screen-navbar.component.css']
})
export class BigScreenNavbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  checkActive(path: string, match: boolean): string {
    if (match) {
      return window.location.pathname.includes(path) ? 'ant-menu-item-selected' : '';
    } else {
      return path === window.location.pathname ? 'ant-menu-item-selected' : '';
    }
  }
}
