import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarTableService {
  data = [
    {
      "key": 10,
    },
    {
      "key": 10.5,
    },
    {
      "key": 11,
    },
    {
      "key": 11.5,
    },
    {
      "key": 12,
    },
    {
      "key": 12.5,
    },
    {
      "key": 13,
    },
    {
      "key": 13.5,
    },
    {
      "key": 14,
    },
    {
      "key": 14.5,
    },
    {
      "key": 15,
    },
    {
      "key": 15.5,
    },
    {
      "key": 16,
    },
    {
      "key": 16.5,
    },
    {
      "key": 17,
    },
    {
      "key": 17.5
    },
    {
      "key": 18
    },
    {
      "key": 18.5
    },
    {
      "key": 19
    },
    {
      "key": 19.5
    }
  ];
  employees = ["Hiep", "Hoang", "Phuong", "Chan", "Ly"];
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
}
