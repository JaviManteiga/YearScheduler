
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { AxiomSchedulerComponent } from './axiom-scheduler/axiom-scheduler.component';
import { AxiomSchedulerEventComponent } from './axiom-scheduler-event/axiom-scheduler-event.component';
import { AxiomSchedulerDropdownComponent } from './axiom-scheduler-dropdown/axiom-scheduler-dropdown.component';
import { AxiomSchedulerYearViewComponent } from './axiom-scheduler-year-view/axiom-scheduler-year-view.component';
import { AxiomSchedulerMonthTileComponent } from './axiom-scheduler-month-tile/axiom-scheduler-month-tile.component';
import { AxiomSchedulerMonthTileDayComponent } from './axiom-scheduler-month-tile-day/axiom-scheduler-month-tile-day.component';
import { AxiomSchedulerSidebarComponent } from './axiom-scheduler-sidebar/axiom-scheduler-sidebar.component';

@NgModule({
  declarations: [
    AxiomSchedulerComponent,
    AxiomSchedulerEventComponent,
    AxiomSchedulerDropdownComponent,
    AxiomSchedulerYearViewComponent,
    AxiomSchedulerMonthTileComponent,
    AxiomSchedulerMonthTileDayComponent,
    AxiomSchedulerSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularDraggableModule
  ],
  exports: [
    AxiomSchedulerComponent,
    AxiomSchedulerEventComponent,
    AxiomSchedulerDropdownComponent,
    AxiomSchedulerYearViewComponent,
    AxiomSchedulerMonthTileComponent,
    AxiomSchedulerMonthTileDayComponent,
    AxiomSchedulerSidebarComponent
  ]
})
export class AxiomSchedulerModule { }
