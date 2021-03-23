import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  toggleButton: boolean = false;
  sidebar: boolean = false;
  fadeSection: boolean = false;
  backBtnState: boolean = false;
  loginStatus: boolean = false;

  routes: any = [
    { path: '/homepage', name: 'Homepage', display: this.loginStatus },
    { path: '/create-category', name: 'Create Category', display: this.loginStatus },
    { path: '/create-kindergarten', name: 'Create Kindergarten', display: this.loginStatus },
    { path: '/create-craftman', name: 'Create Craftman', display: this.loginStatus },
    { path: '/add-todo', name: 'Add New Todo', display: this.loginStatus },
    // { path: '/login', name: 'Login', display: this.loginStatus },
  ];

  constructor(
    private router: Router,
    private backNavigateService: BackNavigateService,
    private checkLogin: LoginService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });

    this.ifLogin();
  }

  toggleMenu() {
    // animating icon
    this.toggleButton = !this.toggleButton;

    // animating sidebar
    this.sidebar = !this.sidebar;

    // enabling fade section
    this.fadeSection = !this.fadeSection;
  }

  routeTo(route) {
    this.router.navigateByUrl(route);
    this.toggleMenu();
    // this.toggleBack();
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

  back() {
    this.location.back();
    this.toggleBack();
  }

  logout() {
    this.checkLogin.setLoginStatus(false);
    this.checkLogin.logout();
    this.toggleMenu();
    this.router.navigateByUrl("/login");
  }

  ifLogin() {
    this.checkLogin.status.subscribe(res => {
      this.loginStatus = res;
      
      if (this.loginStatus) {
        this.router.navigateByUrl('/homepage');
      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

}
