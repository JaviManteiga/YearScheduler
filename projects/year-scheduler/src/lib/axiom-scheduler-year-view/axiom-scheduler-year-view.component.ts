import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as momentNs from 'moment'; const moment = momentNs;
import { AxiomSchedulerComponentCommon } from './../axiom-scheduler/axiom-scheduler.component';

export class AxiomSchedulerYearViewMonthObject {

  public month: momentNs.Moment;
  public days: momentNs.Moment[];
  public weekDays: string[];
  public montWeeks: number[] = [];

  constructor(month: momentNs.Moment) {
    this.month = month.clone();
    this.setDays();
    this.weekDays = Array.from(moment.localeData().weekdaysMin());
    // Pasamos o domingo o final
    this.weekDays.push(this.weekDays.shift());
  }

  setDays(): void {
    const monthSize = 42;
    const startOfMonth = this.month.clone().startOf('month');
    const endOfMonth = this.month.clone().endOf('month');
    this.days = [];
    let day = startOfMonth.clone();
    while (day <= endOfMonth) {
      this.days.push(day);
      day = day.clone().add(1, 'd');
    }
    this.setMonthWeeks(startOfMonth, endOfMonth);
    // Solo si empieza en lunes el mes no se anhade ningun dia anterior
    if (startOfMonth.clone().get('d') > 1 || startOfMonth.clone().get('d') === 0) {
      day = startOfMonth.clone();
      while (day.get('d') > 1 || day.get('d') === 0) {
        day = day.clone().add(-1, 'days');
        this.days.unshift(day);
      }
    }
    if (this.days.length < monthSize) {
      const size = (monthSize - this.days.length);
      for (let index = 1; index <= size; index++) {
        this.days.push(endOfMonth.clone().add(index, 'days'));
      }
    }
  }

  setMonthWeeks(startOfMonth: momentNs.Moment, endOfMonth: momentNs.Moment): void {
    let day = startOfMonth.clone();
    const set = new Set<number>();
    const date = startOfMonth.clone().startOf('year');
    // El domingo es el 0 por lo que lo controlamos especificamente
    let yearStartDays = date.get('d');
    if (yearStartDays === 0) {
      yearStartDays = 6;
    } else {
      yearStartDays -= 1;
    }
    while (day <= endOfMonth) {
      set.add(Math.ceil((day.dayOfYear() + yearStartDays) / 7));
      day = day.add(1, 'd');
    }
    this.montWeeks = Array.from(set);
  }

}

@Component({
  selector: '[ax-scheduler-year-view]',
  templateUrl: './axiom-scheduler-year-view.component.html',
  styleUrls: ['./axiom-scheduler-year-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ax-scheduler__year-view'
  },
  animations: [
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(`${120}ms ease-in-out`, style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate(`${100}ms ease-in-out`, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AxiomSchedulerYearViewComponent extends AxiomSchedulerComponentCommon implements OnInit {

  public months: AxiomSchedulerYearViewMonthObject[];
  public sidebar = false;

  constructor(injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    this.subscriptionGarbageCollection.push(this.sidebarService.toggle.subscribe(toggle => {
      this.sidebar = toggle;
    }));
    this.refresh();
    this.refreshView();
  }

  public refreshView(): void {
    this.setMonths();
  }

  private setMonths(): void {
    const startMonth = this.date.clone().startOf('year');
    const endMonth = this.date.clone().endOf('year');
    this.months = [];
    let month = startMonth.clone();
    while (month <= endMonth) {
      this.months.push(new AxiomSchedulerYearViewMonthObject(month));
      month = month.clone().add(1, 'month');
    }
  }

}
