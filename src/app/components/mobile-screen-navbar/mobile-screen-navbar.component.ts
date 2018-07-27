import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-screen-navbar',
  templateUrl: './mobile-screen-navbar.component.html',
  styleUrls: ['./mobile-screen-navbar.component.css']
})
export class MobileScreenNavbarComponent implements OnInit {
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
