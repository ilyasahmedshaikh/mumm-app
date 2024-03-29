import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';
import { StoreImageService } from '../../core/http/store-image/store-image.service';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  programForm: FormGroup;
  backBtnState: boolean = false;
  commentHaveImg: boolean = false;
  todo: any = {};
  Comments: any = [];
  Categories: any = [];
  loggedInUser: any = '';
  commentImage: any = '';

  user_type: string = '';

  constructor(
    private fb: FormBuilder,
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private location: Location,
    private router : Router,
    private backNavigateService: BackNavigateService,
    public imageStore: StoreImageService,
    private checkLogin: LoginService,
  ) {
    this.todo = this.router.getCurrentNavigation().extras.state.data;
  }
  
  ngOnInit(): void {
    this.loggedInUser = this.checkLogin.getUserData();
    this.user_type = this.checkLogin.getUserData().user_type;

    this.getAllCategories();

    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });

    this.formInit();
    this.getComments();
  }

  formInit() {
    this.programForm = this.fb.group({
      comment: ['', Validators.required],
      done: [false],
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
    if (id) {
      let result = this.Categories.find( ({ Id }) => Id === id );
      return result.name;
    }
  }

  addComment() {
    let data = {
      ...this.programForm.value,
      todoId: this.todo.Id,
      userId: this.loggedInUser.Id,
      userName: this.loggedInUser.name,
      created_at: new Date(),
    }

    if (this.commentHaveImg) {
      data = {
        ...data,
        image: this.imageStore.preview
      }
    }

    this.apiCallService.post(this.config.tables.commentsTable, data).subscribe(res => {
      if (res) {
        alert('Comment Added.');
        this.programForm.reset();
        this.getComments();
        this.imageStore.resetPreviewImage();
        this.commentHaveImg = false;
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

  readURL(event: Event): void {
    // store image in DB and get store URL
    this.imageStore.uploadFile(event);
    this.commentHaveImg = true;
  }

  delete() {
    this.apiCallService.delete(this.config.tables.todoTable, this.todo.Id).subscribe(res => {
      this.toggleBack();
      this.back();
    })
  }

}
