import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';
import { StoreImageService } from '../../core/http/store-image/store-image.service';

@Component({
  selector: 'app-create-kindergarten',
  templateUrl: './create-kindergarten.component.html',
  styleUrls: ['./create-kindergarten.component.scss']
})
export class CreateKindergartenComponent implements OnInit {

  programForm: FormGroup;

  loading: any = "../../../../assets/img/loading.gif";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private config: ConfigService,
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
    let data = {
      ...this.programForm.value, 
      image: this.imageStore.preview,
      count: 0
    };

    this.apiCallService.post(this.config.tables.kindergartens, data).subscribe(res => {
      if (res) {
        alert('Kindergarten Added.');
        this.router.navigateByUrl('/homepage');
        this.imageStore.resetPreviewImage();
      }
    })
  }

}
