import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SectionModule } from '../section/section.module';
// import { StopwatchComponent } from '../section/stopwatch/stopwatch.component';
// import { SectionModule } from '../section/section.module'

@Injectable(
  {
    providedIn: 'root'
    // 앵귤러 팀에서 권장
  }
)
export class PageToggleService {

  public routingCount = 0;

  constructor(
    private router: Router
  ) { }

  goPage(target) {

    this.routingCount++;
    this.router.navigateByUrl(target)
  }
}
