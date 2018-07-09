import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';

const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        'children': [
            {
                'path': 'index',
                'loadChildren': '.\/pages\/default\/index\/index.module#IndexModule',
            },
            // {
            //     'path': 'test',
            //     'loadChildren': '.\/pages\/default\/Test\/test.module#TestModule',
            // },
            {
                'path': 'services',
                'loadChildren': '.\/pages\/default\/services\/services.module#ServiceModule',
            },
            {
                'path': 'order',
                'loadChildren': '.\/pages\/default\/order\/order.module#OrderModule',
            },
            {
                'path': 'orderHistory',
                'loadChildren': '.\/pages\/default\/orderHistory\/orderHistory.module#OrderHistoryModule',
            },
            {
                'path': 'estimatedresponse',
                'loadChildren': '.\/pages\/default\/estimateresponse\/estimateresponse.module#EstimateResponseModule',
            },
            {
                'path': 'profile',
                'loadChildren': '.\/pages\/default\/profile\/profile.module#ProfileModule',
            },
            {
                'path': '',
                'redirectTo': 'index',
                'pathMatch': 'full',
            },
        ],
    },
    {
        'path': '**',
        'redirectTo': 'index',
        'pathMatch': 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeRoutingModule { }