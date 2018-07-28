import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-demo-table-td',
  templateUrl: './demo-table-td.component.html',
  styleUrls: ['./demo-table-td.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoTableTdComponent implements OnInit {

  @Input() calandar: any;

  result;

  constructor() { }

  ngOnInit() {
  }


  addMoreTime(time, em) {
    for (let b of this.calandar[em]) {
      if (b.start === time) {
        b.long += 0.5;
        return;
      }
    }
  }

}
