import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  table: string = 'kindergartens';
  title: string = "Kindergartens"

  kindergartens: any = [];

  Categories: any = [
    { id: 1, name: "Rooms Cleaning" },
    { id: 2, name: "Wooden Works" },
    { id: 3, name: "Tank Cleaning" },
    { id: 4, name: "Dusting" },
    { id: 5, name: "Ground Cleaning" },
    { id: 6, name: "Gardening" },
  ]

  constructor(
    private apiCallService: ApiCallService
  ) { }

  ngOnInit(): void {
    this.getAllKindergartens();
  }

  getRandom() {
    return Math.floor(Math.random() * 5) + 1;
  }

  getAllKindergartens() {
    this.apiCallService.getAll(this.table).subscribe(res => {
      // method to format firebase data in pretty form
      this.kindergartens = this.apiCallService.formatDataListing(res);
    })
  }

}
