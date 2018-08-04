import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ResizeEvent, Edges } from 'angular-resizable-element'; // copy ca ben css.


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
          isLast: false,
          rowspan: 1
        };
        if (time == slot.start) {
          temp.isFirst = true;
          temp.rowspan = slot.long / 0.5;
        }
        if (time == (slot.start + (slot.long - 0.5))) {
          temp.isLast = true;
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

    let slotTimeEnd = slotTimeStart + oldEmployeeData[orderId].long;

    // Vòng lặp qua tất cả các time slot mới mà order sau khi drop sẽ chiếm.
    // Trong trường hợp có một time slot nào đó đã bận
    // => Xét xem nếu chuyển sang nhân viên khác => Không cho drop
    // => Nếu vẫn là cùng nhân viên => Xét xem khoảng thời gian trùng đó có phải là thuộc order chuẩn bị xóa (order cũ) không, nếu sai, hủy drop
    for (let i=slotTimeStart; i<slotTimeEnd; i+=0.5) {
      const timeSlotStatus = this.isBusy(i, currentEmployee);
      if (timeSlotStatus.isBusy && (oldEmployee !== currentEmployee || timeSlotStatus.orderId !== Number(orderId))) return alert("Thời gian bị trùng với lượt đi khách khác!");
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
    if (orderId) {
      // Thời gian kết thúc order mới sẽ thêm 0.5 tiếng, tuy nhiên, khi đưa vào check isBusy lại cần bớt 0.5 tiếng nên 2 phần này triệt tiêu
      const newOrderTimeEnd = employeeData[orderId].start + employeeData[orderId].long;
      if (!this.isBusy(newOrderTimeEnd, em).isBusy) {
        employeeData[orderId].long += 0.5;
      } else alert("Thời gian bị trùng với lượt đi khách khác!");
    }

  }

  /**
   * TODO: Cần tìm đến đúng ô chứa dữ liệu, sau đó chỉnh sửa....
   */
  editTime(modifyEvent,position, em, orderId) {
    let employeeData = this.calandar[em],
      newStart = employeeData[orderId].start,
      newEnd = employeeData[orderId].start + employeeData[orderId].long;
    if (orderId) {

      if (position === 'top') {
        if (modifyEvent.direction === 'up') {
          newStart -= modifyEvent.ratio/2;
        }
        if (modifyEvent.direction === 'down') {
          newStart += modifyEvent.ratio/2;
        }
      }

      else {
        if (modifyEvent.direction === 'up') {
          newEnd -= modifyEvent.ratio/2;
        }
        if (modifyEvent.direction === 'down') {
          newEnd += modifyEvent.ratio/2;
        }
      }
      
      if (newEnd<=newStart) return alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu!");
      if (newStart<=10) return alert("Tiệm bắt đầu đi khách từ 10h!");
      for (let i=newStart; i<newEnd; i+=0.5) {
        const timeSlotStatus = this.isBusy(i, em);
        if (timeSlotStatus.isBusy &&  timeSlotStatus.orderId !== Number(orderId)) return alert("Thời gian bị trùng với lượt đi khách khác!");
      }

      employeeData[orderId].start = newStart;
      employeeData[orderId].long = newEnd - newStart;
    }
  }

  onResizeEnd(event: ResizeEvent, position, em, orderId): void {
    console.log('Element was resized', event);
    let eventResult = this.caculateReize(event.edges);
    console.log('result',eventResult,position);
    // có kết quả rồi, giờ dựa vào vị trí (ở trên hay dưới) để chỉnh sửa thời gian (thêm hoặc bớt)
    setTimeout(() => {
      this.editTime(eventResult, position, em, orderId);
    }, 300)
  }


  /**
   * Tính toán hướng lên hay xuống và kéo được mấy ô để cho dự đoán cộng hay trừ thời gian
   */
  caculateReize(edge:Edges) {
    let distance = +edge.top;
    let value = distance - 0;
    let direction;
    if (value > 0) direction = 'down'
    else if (value < 0) direction = 'up'
    else direction = 'hold';
    let ratio = Math.round(Math.abs(value) / 56);
    return {direction,ratio}
  }
}
