import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {

  // constructor() { }
  sayHi() { return 'Hi!'; }
}


// 서비스를 사용하는 구성요소 (컴포넌트만이 서비스를 사용할 수 있는 것인 아님. 모든 구성요소가 서비스를 사용할 수 있다.)
// 는 더이상 인스턴스의 생성에 대해 관여하지 않아도 된다.
// Angular가 서비스의 인스턴스를 생성하여 컴포넌트에게 전달(주입 injection)해 줄 것이다.
// 다만, 인스턴스를 어떻게 생성하는지 Angular는 알지 못하므로 이 정보를 Angular에게 알려주어야 한다.
// 다시말해 주입될 의존성 인스턴스의 생성 정보를 Angular에 알려 주입을 지시하여야 한다.
// 이러한 인스턴스 생성 정보를 설정하여 의존성 인스턴스의 주입을 지시하는 것을 프로바이더 (provider)라고 부른다.

// 프로바이더는 서비스의 @injectable 메타데이터 객체의 providedIn 프로퍼티를 사용한 프로바이더의 설정은 Angular 6에서 새롭게 도입된 기능이다