import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  programForm: FormGroup;
  table: string = 'categories';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  save() {
    let data = {
      ...this.programForm.value
    };

    this.apiCallService.post(this.table, data).subscribe(res => {
      if (res) {
        alert('Category Added.');
        this.router.navigateByUrl('/homepage');
      }
    })
  }

}
