import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../../core/services/login/login.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  programForm: FormGroup;
  loginStatus: boolean = false;
  Users: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private checkLogin: LoginService,
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.ifLogin();
  }

  formInit() {
    this.programForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const email = this.programForm.value.email;
    const password = this.programForm.value.password;

    this.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.apiCallService.getAll(this.config.tables.userTable).subscribe(res => {
        // method to format firebase data in pretty form
        this.Users = this.apiCallService.formatDataListing(res);

        this.Users.forEach(user => {
          if (user.email == email) {
            this.checkLogin.setLoginData(user);
          }
        });
      })

      this.checkLogin.setLoginStatus(true);
      this.router.navigateByUrl('/homepage');

      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch(err => {
      alert(err.message);
      console.log('Something went wrong: ', err.message);
    });
  }

  ifLogin() {
    this.checkLogin.status.subscribe(res => {
      this.loginStatus = res;
      
      if (this.loginStatus) {
        this.router.navigateByUrl('/homepage');
      }
    })
  }

}
