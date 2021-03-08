import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateKindergartenComponent } from './components/create-kindergarten/create-kindergarten.component';
import { CreateCraftmanComponent } from './components/create-craftman/create-craftman.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
// import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { KindergartenDetailsComponent } from './components/kindergarten-details/kindergarten-details.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'create-kindergarten', component: CreateKindergartenComponent },
  { path: 'create-craftman', component: CreateCraftmanComponent },
  { path: 'add-todo', component: AddTodoComponent },
  // { path: 'edit-todo', component: EditTodoComponent },
  { path: 'kindergarten-details', component: KindergartenDetailsComponent },
  { path: 'todo-details', component: TodoDetailsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
