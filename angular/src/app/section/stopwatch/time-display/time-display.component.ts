import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.css']
})
export class TimeDisplayComponent implements OnInit {
  

  @Input() inputData: string;
  
  min: number = 0
  sec: number = 0
  ms: number = 0

  timeInterval
  
  constructor() { 
    // console.log(this.inputData)
  }

  ngOnInit() {
    // 다시불릴 필요가 없는 메서드나 로직
    // 한번 불려지고 끝
  }

  ngDoCheck() {
    // 컴포넌트 내에서 움직임이 있으면 감지해서 로직을 실행. 여러번 불릴 수 있음.
    // ex reset누를때마다
  }

  ngAfterContentInit() {

  }

  ngAfterContentChecked() {

  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {

  }

  ngOnDestory() {

  }

  timeStart() {
    this.timeStop();
    this.timeInterval = setInterval(() => {
      this.ms++;
    }, 10)
  }

  timeStop() {
    clearInterval(this.timeInterval)
  }

  timeReset() {
    this.timeStop();
    this.ms = 0;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   // console.log(changes);
  //   for (let propName in changes) {
  //     if (propName == 'inputData') {

  //       switch (changes[propName].currentValue) {
  //         case 'start':
  //           this.timeStart();
  //           break;
  //         case 'stop':
  //           this.timeStop();
  //           break;
  //         case 'reset':
  //           this.timeReset();
  //           break;
  //       }
  //     }
  //   }
  // }

}
