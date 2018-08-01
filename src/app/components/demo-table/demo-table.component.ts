import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { timeout } from 'q';
import {forEach} from '@angular/router/src/utils/collection';


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

  dataTransfer:any;

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
    "Hiep": {
      1: {
        "id": 1,
        "customer": "Obama",
        "start": 12,
        "long": 2
      },
      2: {
        "id": 2,
        "customer": "Obama1",
        "start": 18,
        "long": 1
      }
    },
    "Hoang": {
      3: {
        "id": 3,
        "customer": "Obama3",
        "start": 15,
        "long": 2
      },
      4: {
        "id": 4,
        "customer": "Obama4",
        "start": 19,
        "long": 0.5
      }
    }
  };
  constructor(
    public cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log(this.calandar);
  }

  inTime(slot,currentTime) {
    if (slot.start <= currentTime && currentTime < (slot.start + slot.long)) return true
    return false
  }

  // notDuplicate(slot,currentTime) {
  //   if (slot.start > currentTime)
  // }

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
    let employeeData = this.calandar[employee];
    if (employeeData) {
      // for (let slot of this.calandar[employee]) {
      //   if (time >= slot.start && time < (slot.start + slot.long)) {
      //     let temp = {
      //       isBusy: true,
      //       bussinessIndex: this.calandar[employee].indexOf(slot),
      //       isFirst: false,
      //       rowspan: 1
      //     };
      //     if (time === slot.start) {
      //       temp.isFirst = true;
      //       temp.rowspan = slot.long / 0.5;
      //     }
      //     return temp;
      //   }
      // }

      // SOLUTION 1:
      // for (const slotId in employeeData) {
      //   if (employeeData.hasOwnProperty(slotId)) {
      //     const slot = employeeData[slotId];
      //     if (this.inTime(slot,time)) {
      //           let temp = {
      //             isBusy: true,
      //             bussinessIndex: slotId,
      //             isFirst: false,
      //             rowspan: 1
      //           };
      //           if (time === slot.start) {
      //             temp.isFirst = true;
      //             temp.rowspan = slot.long / 0.5;
      //           }
      //           return temp;
      //         }
      //   }
      // }

      // REFACTOR 2
      // lọc lấy slot mà thời gian hiện tại trong khoảng thời gian của slot
      let slotInTimeRange = Object.values(employeeData || {}).filter(slot => this.inTime(slot,time));
      if (slotInTimeRange && slotInTimeRange.length) {
        let slot:any = slotInTimeRange[0];
        let temp = {
          isBusy: true,
          orderId: slot.id,
          isFirst: false,
          rowspan: 1
        };
        if (time == slot.start) {
          temp.isFirst = true;
          temp.rowspan = slot.long / 0.5;
        }
        return temp
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
  dragStart(ev, em, timeSlotStart) {
    this.cd.detach();
    let dataTranfer;
    // for (let i = 0; i < this.calandar[em].length; i++) {
    //   if (timeSlotStart >= this.calandar[em][i].start && timeSlotStart < (this.calandar[em][i].start + this.calandar[em][i].long)) {
    //     this.dataTransfer = [em, i];
    //   }
    // }
    let employeeData = this.calandar[em]
    for (const slotId in employeeData) {
      if (employeeData.hasOwnProperty(slotId)) {
        const slot = employeeData[slotId];
        if (slot.start <= timeSlotStart && timeSlotStart <= (slot. start + slot.long)) {
          // console.log('OK dataTransfer is',[em,slotId])
          this.dataTransfer = [em,slotId]
        } else {
          // console.log('not set dataTransfer')
        }
      }
    }
    // ev.dataTransfer.setData('data', JSON.stringify(dataTranfer));
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  /**
   * Sau khi nhận được tên nhân viên cùng index của order, tiến hành update thông tin theo thông tin của ô được drop vào
   * @param ev
   */
  drop(slotTimeStart, currentEmployee, currentOrderId) {
    const oldEmployee = this.dataTransfer[0];
    const orderId = this.dataTransfer[1];

    // nếu khoảng thời gian của order không bị trùng với order khác
    let oldEmployeeData = this.calandar[oldEmployee];

    // Tính xem order mới sẽ kết thúc vào thời điểm nào, từ đó check xem thời điểm bắt đầu và kết thúc có bị busy không, nếu 1 trong 2 là busy => hủy lệnh drop
    let slotTimeEnd = slotTimeStart + oldEmployeeData[orderId].long;

    const timeStartIsBusy = this.isBusy(slotTimeStart, currentEmployee);
    const timeEndIsBusy = this.isBusy(slotTimeEnd - 0.5, currentEmployee);

    // Nếu chuyển sang nhân viên khác, check xem nếu thời gian bắt đầu hoặc kết thúc bận thì hủy drop
    if (oldEmployee !== currentEmployee) {
      if (timeStartIsBusy.isBusy || timeEndIsBusy.isBusy) return alert("Thời gian bị trùng với lượt đi khách khác!");
    }
    // Nếu chuyển cùng nhân viên, ngoài việc check bận, còn cần check xem có trùng orderId không,
    // nếu thời gian bắt đầu hoặc kết thúc bận, mà lại cùng 1 order thì vẫn cho drop (không return hàm nữa)
    else {
      if ((timeEndIsBusy.isBusy && timeEndIsBusy.orderId !== Number(orderId)) || (timeStartIsBusy.isBusy && timeStartIsBusy.orderId !== Number(orderId))) return alert("Thời gian bị trùng với lượt đi khách khác!");
    }

    console.log('dataTransfer',this.dataTransfer);

    // Nếu tên của nhân viên hoặc thời gian bắt đầu của order đã thay đổi, xóa order cũ đi, tạo order mới và đẩy vào vị trí tương ứng.
    if (oldEmployee !== currentEmployee || oldEmployeeData[orderId].start !== slotTimeStart) {
      const newData = {...oldEmployeeData[orderId]};
      delete oldEmployeeData[orderId];
      if (!this.calandar[currentEmployee]) this.calandar[currentEmployee] = {};
      newData.start = slotTimeStart;
      this.calandar[currentEmployee][orderId] = (newData);
    }
    this.cd.reattach()
  }

  addMoreTime(orderId, em) {
    let employeeData = this.calandar[em];
    // Thời gian kết thúc order mới sẽ thêm 0.5 tiếng, tuy nhiên, khi đưa vào check isBusy lại cần bớt 0.5 tiếng nên 2 phần này triệt tiêu
    const newOrderTimeEnd = employeeData[orderId].start + employeeData[orderId].long;
    if (!this.isBusy(newOrderTimeEnd, em).isBusy) {
      employeeData[orderId].long += 0.5;
    } else alert("Thời gian bị trùng với lượt đi khách khác!");
  }
}
