import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  backBtnState: boolean = false;
  category: any = {};
  Todos: any = [];
  Comments: any = [];
  doneTodos: any = [];

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private location: Location,
    private router : Router,
    private backNavigateService: BackNavigateService,
  ) {
    this.category = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit() {
    this.getComments();

    // calling all Todos Now
    this.getAllTodos();

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
        if (element.category == this.category.Id) {
          filtered.push(element);
        }
      });

      this.Todos = filtered;
      console.log(this.Todos);
      
    })
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

}
