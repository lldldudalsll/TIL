import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test', // selector || class || attribute
  templateUrl: './test.component.html', // possible multiful line by using backtick and inline html by using as key is template
  styleUrls: ['./test.component.css']   // 위와 동일 styles: 사용
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
