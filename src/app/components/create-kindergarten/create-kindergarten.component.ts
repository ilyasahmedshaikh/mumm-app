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
  kindergarten: any = '';
  editMode: boolean = false;
  title: string = "Create Kindergarten";

  loading: any = "../../../../assets/img/loading.gif";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private config: ConfigService,
    private apiCallService: ApiCallService,
    public imageStore: StoreImageService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.kindergarten = this.router.getCurrentNavigation().extras.state.data;
      this.title = "Edit Kindergarten";
      this.editMode = true;
    }
  }

  ngOnInit(): void {
    this.formInit();

    if (this.editMode) {
      this.imageStore.preview = this.kindergarten.image;

      this.programForm.patchValue({
        name: this.kindergarten.name,
        contact: this.kindergarten.contact,
        description: this.kindergarten.description,
      });
    }
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

    this.apiCallService.post(this.config.tables.kindergartensTable, data).subscribe(res => {
      if (res) {
        alert('Kindergarten Added.');
        this.router.navigateByUrl('/homepage');
        this.imageStore.resetPreviewImage();
      }
    })
  }

  update() {
    let data = {
      ...this.programForm.value, 
      image: this.imageStore.preview,
      count: 0
    };

    this.apiCallService.put(this.config.tables.kindergartensTable, this.kindergarten.Id, data).subscribe(res => {
      if (res) {
        alert('Kindergarten Updated.');
        this.router.navigateByUrl('/all-kindergartens');
        this.imageStore.resetPreviewImage();
      }
    })
  }

}
