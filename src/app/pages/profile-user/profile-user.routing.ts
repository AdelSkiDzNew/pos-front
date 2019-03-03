import { Routes, RouterModule } from '@angular/router';
import {ProfileUserComponent } from './profile-user.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ProfileUserComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
