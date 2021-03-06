
import { AxiomSchedulerAnimation } from 'year-scheduler';

import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { AxiomSchedulerComponent } from 'year-scheduler';
import { RouteBaseClass } from '../route.base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RouteBaseClass implements OnInit {

  public model: any = {};
  public themes = ['dark', 'light'];
  public animations = Object.values(AxiomSchedulerAnimation);
  @ViewChild(AxiomSchedulerComponent, { static: false }) scheduler: AxiomSchedulerComponent;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.model.step = 5;
    this.model.toolbar = true;
    this.model.eventTemplate = true;
    this.model.theme = 'light';
    this.model.locale = true;
    this.model.animation = AxiomSchedulerAnimation.Default;
  }

  refreshView(): void {
    this.scheduler.refreshScheduler();
  }

}
