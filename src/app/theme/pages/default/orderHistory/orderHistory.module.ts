import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './orderHistory.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { AgmCoreModule, AgmMap } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServerServices_Services } from '../../../../services/serverServices.services';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": OrderHistoryComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), CalendarModule.forRoot(), LayoutModule, AgmCoreModule.forRoot({
            apiKey: 'AIzaSyABAXCmYooxcSc5GajYQIDIGgM9U2n6vyg'
        }), NgbModule.forRoot(), FormsModule, ReactiveFormsModule
    ], exports: [
        NgbModule,
        HttpModule
    ], declarations: [
        OrderHistoryComponent
    ],
    providers: [ServerServices_Services]
})
export class OrderHistoryModule {


}