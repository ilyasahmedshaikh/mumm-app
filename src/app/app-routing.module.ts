import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateKindergartenComponent } from './components/create-kindergarten/create-kindergarten.component';
import { CreateCraftmanComponent } from './components/create-craftman/create-craftman.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { KindergartenDetailsComponent } from './components/kindergarten-details/kindergarten-details.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ImportantTodosComponent } from './components/important-todos/important-todos.component';
import { AllKindergartensComponent } from './components/all-kindergartens/all-kindergartens.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'create-kindergarten', component: CreateKindergartenComponent },
  { path: 'create-craftman', component: CreateCraftmanComponent },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'edit-todo', component: EditTodoComponent },
  { path: 'kindergarten-details', component: KindergartenDetailsComponent },
  { path: 'todo-details', component: TodoDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'important-todos', component: ImportantTodosComponent },
  { path: 'all-kindergartens', component: AllKindergartensComponent },
  { path: 'category-details', component: CategoryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
