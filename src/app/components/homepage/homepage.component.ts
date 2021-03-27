import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { CheckLoginService } from '../../core/services/check-login/check-login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title: string = "Kindergartens"
  backBtnState: boolean = false;

  kindergartens: any = [];
  Categories: any = [];
  Todos: any = [];
  TodoSeen: any = [];

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private backNavigateService: BackNavigateService,
    private login: CheckLoginService
  ) { }

  ngOnInit(): void {
    this.getSeenTodoStatus();
    this.getAllKindergartens();
    this.getAllCategories();

    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });
  }

  getRandom() {
    return Math.floor(Math.random() * 5) + 1;
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

  getAllKindergartens() {
    this.apiCallService.getAll(this.config.tables.kindergartensTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.kindergartens = this.apiCallService.formatDataListing(res);

      // getting all todos to perform filteration
      this.getAllTodos();
    })
  }

  getAllCategories() {
    this.apiCallService.getAll(this.config.tables.categoriesTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Categories = this.apiCallService.formatDataListing(res);
    })
  }

  getAllTodos() {
    this.apiCallService.getAll(this.config.tables.todoTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Todos = this.apiCallService.formatDataListing(res);
      
      if(this.kindergartens && this.Todos) this.calculateCount();
    })
  }

  calculateCount() {
    this.Todos.map(todo => {
      this.kindergartens.map((kindergarten, i) => {
        if (todo.kindergartens.includes(kindergarten.Id) && !this.TodoSeen.includes(todo.Id)) {
          return kindergarten.count = kindergarten.count+1;
        }
      })
    })
    
    this.sortMaxCounted();
  }

  sortMaxCounted() {
    let haveCount = this.kindergartens.filter(k => k.count > 0);
    let dontHaveCount = this.kindergartens.filter(k => k.count == 0);

    this.kindergartens = [...haveCount , ...dontHaveCount];
  }

  getSeenTodoStatus() {
    let allSeenTodos = [];
    let filteredSeenTodos = [];
    let user = this.login.getUserData();

    this.apiCallService.getAll(this.config.tables.todoSeenTable).subscribe(res => {
      // method to format firebase data in pretty form
      allSeenTodos = this.apiCallService.formatDataListing(res);
      console.log(allSeenTodos);
      
      allSeenTodos.map(item => {
        if (user.Id == item.userId) {
          filteredSeenTodos.push(item.todos);
        }
      })

      // converting array of arrays to array of objects
      filteredSeenTodos.map((item, i) => {
        item.map((todo, index) => {
          this.TodoSeen.push(todo)
        })
      })
    })
  }

}
