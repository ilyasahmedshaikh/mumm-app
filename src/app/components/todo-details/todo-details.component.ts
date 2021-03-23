import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  programForm: FormGroup;
  backBtnState: boolean = false;
  todo: any = {};
  Comments: any = [];
  Categories: any = [];

  constructor(
    private fb: FormBuilder,
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private location: Location,
    private router : Router,
    private backNavigateService: BackNavigateService,
  ) {
    this.todo = this.router.getCurrentNavigation().extras.state.data;
  }

  ngOnInit(): void {
    this.getAllCategories();

    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });

    this.formInit();
    this.getComments();
  }

  formInit() {
    this.programForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

  back() {
    this.location.back();
  }

  getAllCategories() {
    this.apiCallService.getAll(this.config.tables.categoriesTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Categories = this.apiCallService.formatDataListing(res);
    })
  }

  getCategoryName(id) {
    let result = this.Categories.find( ({ Id }) => Id === id );
    return result.name;
  }

  addComment() {
    let data = {
      ...this.programForm.value,
      todoId: this.todo.Id,
      userId: '-MWU1Dv678XvaVF3AafW',
      userName: 'Amir',
      created_at: new Date(),
    }

    this.apiCallService.post(this.config.tables.commentsTable, data).subscribe(res => {
      if (res) {
        alert('Comment Added.');
        this.programForm.reset();
        this.getComments();
      }
    })
  }

  getComments() {
    this.Comments = [];

    this.apiCallService.getAll(this.config.tables.commentsTable).subscribe(res => {
      // method to format firebase data in pretty form
      let data = this.apiCallService.formatDataListing(res);

      data.forEach(comment => {
        if (comment.todoId == this.todo.Id) {
          this.Comments.push(comment);
        }
      });
    })
  }

}
