import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  @Output() selectCategory = new EventEmitter<any>();

  programForm: FormGroup;
  kindergartens: any = [];
  Categories: any = [];
  selectedKindergartens: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getAllKindergartens();
    this.getAllCategories();
  }

  formInit() {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      important: [false],
    });
  }

  categoryClicked(data) {
    if (!this.selectedKindergartens.includes(data.Id)) {
      this.selectedKindergartens.push(data.Id);
    } else {
      this.selectedKindergartens = this.selectedKindergartens.filter(item => item !== data.Id)
    }
  }

  getAllKindergartens() {
    this.apiCallService.getAll(this.config.tables.kindergartensTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.kindergartens = this.apiCallService.formatDataListing(res);
    })
  }

  getAllCategories() {
    this.apiCallService.getAll(this.config.tables.categoriesTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Categories = this.apiCallService.formatDataListing(res);
    })
  }

  save() {
    let data = {
      ...this.programForm.value, 
      kindergartens: this.selectedKindergartens,
      created_at: new Date(),
    };

    this.apiCallService.post(this.config.tables.todoTable, data).subscribe(res => {
      if (res) {
        alert('New Todo Added.');
        this.router.navigateByUrl('/homepage');
      }
    })
  }

}
