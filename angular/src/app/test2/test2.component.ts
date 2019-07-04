import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GreetingService } from '../greeting.service';

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
    <button (click)="sayHi()">Greet</button>
    <p>{{ greeting }}</p>
  `,
  styles: [``],
  // providers: [GreetingService] /* @Component 프로바이더 */
  providers: [{
    // 의존성 인스턴스의 타입(토큰, Token)
    provide: GreetingService,
    // 의존성 인스턴스를 생성할 클래스
    useClass: GreetingService
  }]
  // 이와 같은 방법으로 Angular는 주입할 의존 관계 객체의 생성 방법을 알게 되고 providers 프로퍼티의 설정 정보대로 동작하여 의존 관계 객체의 인스턴스를 생성하고 주입한다. 
  // 이제 컴포넌트는 의존 관계 객체의 생성 방법을 알 필요가 없고 인젝터가 생성하여 생성자의 인자로 주입한 인스턴스를 사용하기만 하면 된다.
})
export class Test2Component implements OnInit {

  greeting: string;

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

  constructor(private greetingService: GreetingService) { // 의존성 주입!
    // 서비스의 인스턴스를 직접 생성한다.
    // this.greetingService = new GreetingService();

    // 의존성 주입을 사용하면 컴포넌트가 직접 의존성의 인스턴스를 생성하는 것이 아니라 컴포넌트는 단지 필요한 의존성을 요구하고, 프레임워크가
    // 제어권을 갖는 주체로 동작하여 요구된 의존성 인스턴스를 생성하여 전달한다.
    // 이를 제어권의 역전 (inversion of control)이라 한다.

    // 주입을 요청할 때는 constructor의 파라미터에 주입된 인스턴스를 담을 변수의 이름과 주입대상의 타입을 명시한다.

    // 위 코드는 GreetingService 타입의 인스턴스를 주입 요청하고 있다. 
    // Angular는 주입 요청된 인스턴스의 타입 GreetingService와 일치하는 프로바이더
    // (의존성 주입을 위해 @NgModule이나 @Component 메타데이터 객체의 providers 프로퍼티에 등록한 인스턴스 생성 정보)
    // 의 토큰(providers.provide 프로퍼티)을 검색한다. 
    // 검색이 성공하면 프로바이더의 useClass 프로퍼티에 지정된 클래스를 사용하여 인스턴스를 생성한다. 
    // 그리고 이 인스턴스를 greetingService 프로퍼티에 할당하여 주입한다.
    // constructor 파라미터에 접근 제한자를 선언하였으므로 greetingService는 컴포넌트 내에서 this에 의해 참조 가능한 클래스 프로퍼티이다.
  }

  sayHi() {
    // 주입된 서비스의 사용
    this.greeting = this.greetingService.sayHi();
  }

  ngOnInit() {
  }

  fireEvent() {
    this.childEvent.emit('Sons of Anarchy')
  }

}
