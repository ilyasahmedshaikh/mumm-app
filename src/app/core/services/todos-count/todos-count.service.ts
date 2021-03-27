import { Injectable } from '@angular/core';
import { ConfigService } from '../../http/config/config.service';
import { ApiCallService } from '../../http/api-call/api-call.service';
import { CheckLoginService } from '../../services/check-login/check-login.service';

import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosCountService {

  public headerImportantNotify = new BehaviorSubject<boolean>(false);
  public data = new Subject<any>();
  
  TodoSeen: any = [];

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private login: CheckLoginService
  ) { }

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
      this.data.next(this.TodoSeen);
    })
  }

}
