import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../core/http/config/config.service';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title: string = "Kindergartens"

  kindergartens: any = [];
  Categories: any = []

  constructor(
    private config: ConfigService,
    private apiCallService: ApiCallService
  ) { }

  ngOnInit(): void {
    this.getAllKindergartens();
    this.getAllCategories();
  }

  getRandom() {
    return Math.floor(Math.random() * 5) + 1;
  }

  getAllKindergartens() {
    this.apiCallService.getAll(this.config.tables.kindergartensTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.kindergartens = this.apiCallService.formatDataListing(res);
    })
  }

  getAllCategories() {
    this.apiCallService.getAll(this.config.tables.categoriesTable).subscribe(res => {
      // method to format firebase data in pretty form
      this.Categories = this.apiCallService.formatDataListing(res);
    })
  }

}
