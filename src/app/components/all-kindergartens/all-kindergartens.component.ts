import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-all-kindergartens',
  templateUrl: './all-kindergartens.component.html',
  styleUrls: ['./all-kindergartens.component.scss']
})
export class AllKindergartensComponent implements OnInit {

  kindergartens: any = [];

  constructor(
    private router: Router,
    private config: ConfigService,
    private apiCallService: ApiCallService,
    private backNavigateService: BackNavigateService,
  ) { }

  ngOnInit(): void {
    this.getAllKindergartens();
  }

  getAllKindergartens() {
    this.apiCallService.getAll(this.config.tables.kindergartensTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.kindergartens = this.apiCallService.formatDataListing(res);
    })
  }

  editKindergarten(item) {
    this.router.navigate(['/create-kindergarten'], { state:{ data: item } });
    this.toggleBack();
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

}
