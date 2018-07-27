import {Directive, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appNgInit]',
  exportAs: 'appNgInit'
})
export class NgInitDirective implements OnInit {

  constructor() { }
  @Input() data: any = {};
  @Input() ngInit;
  ngOnInit() {
    if (this.ngInit) { this.ngInit(); }
  }
}
