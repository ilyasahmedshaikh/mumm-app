import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-important-todos',
  templateUrl: './important-todos.component.html',
  styleUrls: ['./important-todos.component.scss']
})
export class ImportantTodosComponent implements OnInit {

  backBtnState: boolean = false;
  Todos: any = [];
  Categories: any = [];

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private location: Location,
    private router : Router,
    private backNavigateService: BackNavigateService,
  ) { }

  ngOnInit() {
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
        if (element.important == true || element.important == 'true') {
          filtered.push(element);
        }
      });

      this.Todos = filtered;
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

}
