import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title: string = "Kindergartens"

  kindergartens: any = [];
  Categories: any = [];
  Todos: any = [];

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService
  ) { }

  ngOnInit(): void {
    this.getAllKindergartens();
    this.getAllCategories();
  }

  getRandom() {
    return Math.floor(Math.random() * 5) + 1;
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
        if (todo.kindergartens.includes(kindergarten.Id)) {
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

}
