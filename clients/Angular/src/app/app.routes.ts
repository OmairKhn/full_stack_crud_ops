import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: UserListComponent },
    { path: 'add-user', component: UserFormComponent },
    { path: 'edit-user/:id', component: UserFormComponent }
];
