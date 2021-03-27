import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { TodosCountService } from '../../core/services/todos-count/todos-count.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  toggleButton: boolean = false;
  sidebar: boolean = false;
  fadeSection: boolean = false;
  backBtnState: boolean = false;
  loginStatus: boolean = false;
  user_type: string = "";
  user: any = {};
  Todos: any = [];
  TodoSeen: any = [];
  notify: boolean = false;

  routes: any = [];

  constructor(
    private router: Router,
    private backNavigateService: BackNavigateService,
    private checkLogin: LoginService,
    private location: Location,
    private todosCount: TodosCountService,
    private config: ConfigService,
    private apiCallService: ApiCallService,
  ) { }

  ngOnInit() {
    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });

    this.ifLogin();
    this.getAllTodos();

    this.todosCount.getSeenTodoStatus();

    this.todosCount.data.subscribe(res => {
      this.TodoSeen = res;
    })

    this.todosCount.headerImportantNotify.subscribe(res => {
      this.notify = res;
    })
  }

  assignRoutes(user_type) {
    if (user_type == "admin") {
      this.routes = [
        { path: '/homepage', name: 'Homepage' },
        { path: '/create-category', name: 'Create Category' },
        { path: '/all-kindergartens', name: 'All Kindergartens' },
        { path: '/create-kindergarten', name: 'Create Kindergarten' },
        { path: '/create-craftman', name: 'Create Craftman' },
        { path: '/add-todo', name: 'Add New Todo' },
      ]
    } else {
      this.routes = [
        { path: '/homepage', name: 'Homepage' },
        { path: '/add-todo', name: 'Add New Todo' },
      ]
    }
  }

  toggleMenu() {
    // animating icon
    this.toggleButton = !this.toggleButton;

    // animating sidebar
    this.sidebar = !this.sidebar;

    // enabling fade section
    this.fadeSection = !this.fadeSection;
  }

  routeTo(route) {
    this.router.navigateByUrl(route);
    this.toggleMenu();
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

  back() {
    this.location.back();
    this.toggleBack();
  }

  logout() {
    this.checkLogin.setLoginStatus(false);
    this.checkLogin.logout();
    this.toggleMenu();
    this.router.navigateByUrl("/login");
  }

  ifLogin() {
    this.checkLogin.status.subscribe(res => {
      this.loginStatus = res;
      
      if (this.loginStatus) {
        this.router.navigateByUrl('/homepage');

        this.user = this.checkLogin.getUserData();
        this.user_type = this.checkLogin.getUserData().user_type;
        this.assignRoutes(this.user_type);
      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

  getAllTodos() {
    let todos = [];
    let filtered = [];

    this.apiCallService.getAll(this.config.tables.todoTable).subscribe(res => {
      // method to format firebase data in pretty form
      todos = this.apiCallService.formatDataListing(res);

      todos.forEach(element => {
        if (element.important == true || element.important == 'true') {
          filtered.push(element);
        }
      });

      this.Todos = filtered;
      this.getTodosSeen();
    })
  }

  getTodosSeen() {
    if (this.Todos.length > 0 && this.TodoSeen.length == 0) {
      this.todosCount.headerImportantNotify.next(true);
    }

    if (this.Todos.length > 0 && this.TodoSeen.length > 0) {
      this.Todos.map(item => {
        if (this.TodoSeen.includes(item.Id)) {
          this.todosCount.headerImportantNotify.next(false);
        }
      })
    }

  }

}
