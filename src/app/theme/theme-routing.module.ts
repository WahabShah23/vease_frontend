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
            {
                'path': 'services',
                'loadChildren': '.\/pages\/default\/services\/services.module#ServiceModule',
            },
            {
                'path': 'orderHistory',
                'loadChildren': '.\/pages\/default\/orderHistory\/orderHistory.module#OrderHistoryModule',
            },
            {
                'path': 'order',
                'loadChildren': '.\/pages\/default\/order\/order.module#OrderModule',
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