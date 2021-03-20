import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-create-craftman',
  templateUrl: './create-craftman.component.html',
  styleUrls: ['./create-craftman.component.scss']
})
export class CreateCraftmanComponent implements OnInit {

  programForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private config: ConfigService,
    private apiCallService: ApiCallService,
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.programForm = this.fb.group({
      name: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      address: [''],
    });
  }

  addCraftman() {
    // making authentic account for craftman in Database
    this.auth.createUserWithEmailAndPassword(this.programForm.value.email, this.programForm.value.password)
      .then(value => {
        console.log('Success!', value);

        // adding Craftman to database for user_type and other profile biodata
        let data = {
          name: this.programForm.value.name,
          email: this.programForm.value.email,
          contact: this.programForm.value.contact,
          address: this.programForm.value.address,
        }

        this.apiCallService.post(this.config.tables.craftmanTable, data).subscribe(res => {
          if (res) {
            alert('Craftman Added.');
            this.router.navigateByUrl('/homepage');
          }
        }),
        error => {
          alert(error);
        }
      })
      .catch(err => {
        console.log('Something went wrong: ',err.message);
      });
  }

}
