import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

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

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private location: Location,
    private router : Router,
    private backNavigateService: BackNavigateService,
  ) {
    this.kinder = this.router.getCurrentNavigation().extras.state.data;
  }

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
        if (element.kindergartens.includes(this.kinder.Id)) {
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
