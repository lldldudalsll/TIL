import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageToggleService } from 'src/app/share/page-toggle.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css'],
  // providers: [
  //   PageToggleService
  // ]
})
export class StopwatchComponent implements OnInit {

  parent = 'Welcome';

  commandText

  constructor(
    private router : Router,
    public pageToggleService: PageToggleService  // 페이지토글 서비스 주입해주길를 원하고 있다.
  ) { }

  goClock() {
    this.pageToggleService.goPage('/clock')
  }
  
  startTime($event) {
    // console.log('섹션컴포넌트가 잘 받았다.', $event)
    this.parent = $event;
  }

  ngOnInit() {
  }

}
