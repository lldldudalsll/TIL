import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test2',
  template: `
    <h2>2019 GOTY is {{parentData}}</h2>
    <div *ngIf="displayName; then thenBlock; else elseBlock"></div>
    <ng-template #thenBlock>
      <h2>CodeEvolution</h2>
    </ng-template>

    <ng-template #elseBlock>
      <h2>Hidden</h2>
    </ng-template>
    <input [(ngModel)]="name" type="text">
    {{name}}

    <div *ngFor="let fruit of fruits index as i">{{i}}{{fruit}}</div>
    index, first, last, odd, even 등 으로 선택할 수 있음.

    <button (click)="fireEvent()">button</button>
  `,
  styles: [``]
})
export class Test2Component implements OnInit {

  @Input() public parentData;
  @Output() public childEvent = new EventEmitter();
  // @Input('parentData) public Game; 이렇게도 사용 가능! 그럼 위의 보간법에도 {{name}} 으로 작성!
  displayName = true;
  public name = '';
  public fruits = ['Banana', 'Apple', 'Grape', 'Orange', 'WaterMelon', 'StrawBerry']

  constructor() { }

  ngOnInit() {
  }

  fireEvent() {
    this.childEvent.emit('Hey Guys fXXX off!')
  }

}
