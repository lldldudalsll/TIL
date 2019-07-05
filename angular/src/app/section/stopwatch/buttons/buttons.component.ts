import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Output() clickEvent = new EventEmitter<string>();  // generic 으로 명시해주는 것이 좋음.

  // count: number = 0;

  constructor() { }

  executeButton(command: string) {
    this.clickEvent.emit(command); // 부모컴포넌트가 기다리고 있다가 click 이벤트 발생시 자식이 부모에게 전달
  }

  ngOnInit() {
  }


}
