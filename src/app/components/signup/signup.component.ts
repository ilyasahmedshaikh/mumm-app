import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  programForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth,
    private config: ConfigService,
    private apiCallService: ApiCallService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', Validators.required],
      address: [''],
    });
  }

  signup() {
    // making authentic account for detailer in Database
    this.auth.createUserWithEmailAndPassword(this.programForm.value.email, this.programForm.value.password)
      .then(value => {
        // adding detailer to firestore for user_type and other profile biodata
        let data = {
          ...this.programForm.value,
          user_type: 'user'
        };
    
        this.apiCallService.post(this.config.tables.kindergartensTable, data).subscribe(res => {
          if (res) {
            alert('Signup Success.');
            this.router.navigateByUrl('/homepage');
          }
        })
      })
      .catch(err => {
        alert(err.message);
        console.log('Something went wrong: ', err.message);
      });
  }

}
