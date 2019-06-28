import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test', // selector || class || attribute
  templateUrl: './test.component.html', // possible multiful line by using backtick and inline html by using as key is template
  styleUrls: ['./test.component.css']   // 위와 동일 styles: 사용
})
export class TestComponent implements OnInit {

  public name = 'Ngenebio';
  public siteUrl = window.location.href;
  public myId = 'testId';
  public isDisabled = true;

  public greeting = ''
  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    console.log(event)
    this.greeting = 'Welcome to NgeneBio'
  }

  logMessage(value) {
    console.log(value)
  }

}
