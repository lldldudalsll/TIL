import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  parent = 'Welcome';

  constructor() { }

  ngOnInit() {
  }

  startTime($event) {
    // console.log('섹션컴포넌트가 잘 받았다.', $event)
    this.parent = $event;
  }
}
