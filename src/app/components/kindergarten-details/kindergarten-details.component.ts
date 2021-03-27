import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { CheckLoginService } from '../../core/services/check-login/check-login.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';
import { TodosCountService } from '../../core/services/todos-count/todos-count.service';

@Component({
  selector: 'app-kindergarten-details',
  templateUrl: './kindergarten-details.component.html',
  styleUrls: ['./kindergarten-details.component.scss']
})
export class KindergartenDetailsComponent implements OnInit {

  backBtnState: boolean = false;
  kinder: any = {};
  Todos: any = [];
  Categories: any = [];
  Comments: any = [];
  doneTodos: any = [];

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private location: Location,
    private router : Router,
    private backNavigateService: BackNavigateService,
    private login: CheckLoginService,
    private todosCount: TodosCountService,
  ) {
    this.kinder = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit() {
    this.getComments();
    this.getAllCategories();

    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

  back() {
    this.location.back();
  }

  getAllTodos() {
    let todos = [];
    let filtered = [];

    this.apiCallService.getAll(this.config.tables.todoTable).subscribe(res => {
      // method to format firebase data in pretty form
      todos = this.apiCallService.formatDataListing(res);

      todos.forEach(element => {
        if (element.kindergartens.includes(this.kinder.Id)) {
          filtered.push(element);
        }
      });

      this.Todos = filtered;
      this.maintainUserSeen();
    })
  }

  getAllCategories() {
    this.apiCallService.getAll(this.config.tables.categoriesTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Categories = this.apiCallService.formatDataListing(res);

      // calling all Todos Now
      this.getAllTodos();
    })
  }

  getCategoryName(id) {
    let result = this.Categories.find( ({ Id }) => Id === id );
    return result.name;
  }

  getComments() {
    this.apiCallService.getAll(this.config.tables.commentsTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Comments = this.apiCallService.formatDataListing(res);
      this.filterDoneTodos();
    })
  }

  filterDoneTodos() {
    this.Comments.forEach(comment => {
      if (comment.done) {
        this.doneTodos.push(comment.todoId);
      }
    });
  }

  maintainUserSeen()
  {
    let ifImportantFound = false;

    if (this.Todos.length > 0) {
      if(this.Todos.filter(i => i.important == true).length > 0) ifImportantFound = true;

      let data = {
        todos: this.Todos.map(todo => todo.Id),
        userId: this.login.getUserData().Id
      }
  
      this.apiCallService.post(this.config.tables.todoSeenTable, data).subscribe(res => {
        if (res) {
          if (ifImportantFound) this.todosCount.headerImportantNotify.next(false);
        }
      })
    }
  }

}
