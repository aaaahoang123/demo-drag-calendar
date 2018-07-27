import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.css']
})
export class DemoTableComponent implements OnInit {
  /**
   * Data của các time slot
   * Mỗi time slot có thời gian bắt đầu và kết thúc, có thể kéo dài khoảng 15p hoặc nửa tiếng...
   * @type {{start: number}[]}
   */
  timeSlots = [
    {
      "start": 10,
    },
    {
      "start": 10.5,
    },
    {
      "start": 11,
    },
    {
      "start": 11.5,
    },
    {
      "start": 12,
    },
    {
      "start": 12.5,
    },
    {
      "start": 13,
    },
    {
      "start": 13.5,
    },
    {
      "start": 14,
    },
    {
      "start": 14.5,
    },
    {
      "start": 15,
    },
    {
      "start": 15.5,
    },
    {
      "start": 16,
    },
    {
      "start": 16.5,
    },
    {
      "start": 17,
    },
    {
      "start": 17.5
    },
    {
      "start": 18
    },
    {
      "start": 18.5
    },
    {
      "start": 19
    },
    {
      "start": 19.5
    }
  ];
  /**
   * Data các nhân viên
   * @type {string[]}
   */
  employees = ["Hiep", "Hoang", "Phuong", "Chan", "Ly"];
  /**
   * Data lịch đã được đặt, phần này lấy trên db sẽ là array, nhưng về đây sẽ thêm thao tác
   * chuyển thành dạng object key-value để truy xuất theo tên (hoặc id nhân viên) cho dễ
   */
  calandar = {
    "Hiep": [
      {
        "id": 1,
        "customer": "Obama",
        "start": 12,
        "long": 2
      },
      {
        "id": 2,
        "customer": "Obama1",
        "start": 18,
        "long": 1
      }
    ],
    "Hoang": [
      {
        "id": 3,
        "customer": "Obama3",
        "start": 15,
        "long": 2
      },
      {
        "id": 4,
        "customer": "Obama4",
        "start": 19,
        "long": 0.5
      }
    ]
  };
  constructor() { }

  ngOnInit() {
    console.log(this.calandar);
  }

  /**
   * Check xem time slot của nhân viên này đã bận chưa
   * Nếu đã bận => isBusy = true
   * bussinessIndex: Gửi kèm index của một order (vì 1 nhân viên có thể được đặt vài order trong ngày)
   * isFirst: Check xem time slot này có phải là time slot đầu tiên trong order không (1 order có thể chiếm vài slot)
   * Nếu là đầu tiên, nó sẽ chiếm rowspan = slot.long / 0.5, tức là 4 dòng nếu order được kéo dài 2h
   * Nếu không phải đầu tiên, ô sẽ không được hiển thị lên bảng
   * @param {Number} time
   * @param {string} employee
   * @returns {any}
   */
  isBusy(time: Number, employee: string): any {
    if (this.calandar[employee]) {
      for (let slot of this.calandar[employee]) {
        if (time >= slot.start && time < (slot.start + slot.long)) {
          let temp = {
            isBusy: true,
            bussinessIndex: this.calandar[employee].indexOf(slot),
            isFirst: false,
            rowspan: 1
          };
          if (time === slot.start) {
            temp.isFirst = true;
            temp.rowspan = slot.long / 0.5;
          }
          return temp;
        }
      }
    }
    return {
      isBusy: false
    };
  }

  /**
   * Khi drag, transfer tên (hoặc id nhân viên), cùng với index của order
   * @param ev
   * @param em
   * @param key
   */
  dragStart(ev, em, key) {
    let dataTranfer;
    for (let i = 0; i < this.calandar[em].length; i++) {
      if (key >= this.calandar[em][i].start && key < (this.calandar[em][i].start + this.calandar[em][i].long)) {
        dataTranfer = [em, i];
      }
    }
    ev.dataTransfer.setData('data', JSON.stringify(dataTranfer));
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  /**
   * Sau khi nhận được tên nhân viên cùng index của order, tiến hành update thông tin theo thông tin của ô được drop vào
   * @param ev
   */
  drop(ev) {
    const dataTransfer = JSON.parse(ev.dataTransfer.getData('data'));
    const employee = dataTransfer[0];
    const orderIndex = dataTransfer[1];
    // Nếu tên của nhân viên hoặc thời gian bắt đầu của order đã thay đổi, xóa order cũ đi, tạo order mới và đẩy vào vị trí tương ứng.
    if (employee !== ev.target.getAttribute('data-em') || this.calandar[employee][orderIndex].start !== Number(ev.target.getAttribute('data-time'))) {
      const newData = {...this.calandar[employee][orderIndex]};
      this.calandar[employee].splice(orderIndex, 1);
      if (!this.calandar[ev.target.getAttribute('data-em')]) this.calandar[ev.target.getAttribute('data-em')] = [];
      newData.start = Number(ev.target.getAttribute('data-time'));
      this.calandar[ev.target.getAttribute('data-em')].push(newData);
    }
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
