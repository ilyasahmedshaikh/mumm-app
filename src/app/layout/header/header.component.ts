import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
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

  routes: any = [
    { path: '/homepage', name: 'Homepage'},
    { path: '/create-category', name: 'Create Category'},
    { path: '/create-kindergarten', name: 'Create Kindergarten'},
    { path: '/create-craftman', name: 'Create Craftman'},
    { path: '/add-todo', name: 'Add New Todo'},
    { path: '/login', name: 'Login'},
  ];

  constructor(
    private router: Router,
    private backNavigateService: BackNavigateService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });
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

}
