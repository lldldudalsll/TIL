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
    <br>
    {{pipe}}<br>
    {{pipe | lowercase}}<br>
    {{pipe | uppercase}}<br>
    {{message | titlecase}}<br>
    {{pipe | slice:3:5 }}<br>
    {{person | json}} // 객체는 json 으로<br>
    <h2>{{5.678 | number: '1.2-3'}}</h2>
    <h2>{{5.678 | number: '3.4-5'}}</h2>
    <h2>{{5.678 | number: '3.1-5'}}</h2>

    <h2>{{ 0.25 | percent }}</h2>
    <h2>{{ 0.25 | currency }}</h2>
    <h2>{{ 0.25 | currency: 'EUR': 'code' }}</h2>

    <h2>{{ date }}</h2>
    <h2>{{ date | date: 'short' }}</h2>
    <h2>{{ date | date: 'shortDate' }}</h2>
    <h2>{{ date | date: 'shortTime' }}</h2> // medium | long
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
  public pipe = 'YoungMin'
  public message = 'welcome to codevolution'
  public fruits = ['Banana', 'Apple', 'Grape', 'Orange', 'WaterMelon', 'StrawBerry']
  public person = {
    'firstname': 'John',
    'lastname': 'Doe'
  }
  public date = new Date

  constructor() { }

  ngOnInit() {
  }

  fireEvent() {
    this.childEvent.emit('Sons of Anarchy')
  }

}
