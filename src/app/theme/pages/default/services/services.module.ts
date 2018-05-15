import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { AgmCoreModule, AgmMap } from '@agm/core';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ServicesComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, AgmCoreModule.forRoot({
            apiKey: 'AIzaSyABAXCmYooxcSc5GajYQIDIGgM9U2n6vyg'
          })
    ], exports: [
        RouterModule
    ], declarations: [
        ServicesComponent
    ]
})
export class ServiceModule {
    

}