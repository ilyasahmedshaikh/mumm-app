import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiCallService } from '../../core/http/api-call/api-call.service';
import { StoreImageService } from '../../core/http/store-image/store-image.service';

@Component({
  selector: 'app-create-kindergarten',
  templateUrl: './create-kindergarten.component.html',
  styleUrls: ['./create-kindergarten.component.scss']
})
export class CreateKindergartenComponent implements OnInit {

  programForm: FormGroup;
  table: string = 'kindergartens';

  loading: any = "../../../../assets/img/loading.gif";

  httpRequest: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
    public imageStore: StoreImageService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  
  readURL(event: Event): void {
    this.imageStore.readURL(event);

    // store image in DB and get store URL
    this.imageStore.uploadFile(event);
  }

  save() {
    this.httpRequest = true;

    let data = {
      ...this.programForm.value, 
      image: this.imageStore.preview
    };

    this.apiCallService.post(this.table, data).subscribe(res => {
      if (res) {
        this.httpRequest = false;
        alert('Kindergarten Added.');
        this.router.navigateByUrl('/homepage');
      }
    })
  }

}
