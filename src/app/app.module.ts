import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateKindergartenComponent } from './components/create-kindergarten/create-kindergarten.component';
import { CreateCraftmanComponent } from './components/create-craftman/create-craftman.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SliderComponent } from './layout/slider/slider.component';
import { KindergartenDetailsComponent } from './components/kindergarten-details/kindergarten-details.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetComponent } from './components/forget/forget.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CreateCategoryComponent,
    CreateKindergartenComponent,
    CreateCraftmanComponent,
    AddTodoComponent,
    EditTodoComponent,
    LoginComponent,
    HeaderComponent,
    SliderComponent,
    KindergartenDetailsComponent,
    TodoDetailsComponent,
    SignupComponent,
    ForgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
