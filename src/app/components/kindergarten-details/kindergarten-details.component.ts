import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common'
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';

@Component({
  selector: 'app-kindergarten-details',
  templateUrl: './kindergarten-details.component.html',
  styleUrls: ['./kindergarten-details.component.scss']
})
export class KindergartenDetailsComponent implements OnInit {

  backBtnState: boolean = false;

  Todo: any = [
    { id: 1, topic: "Topic 1", date: "07-02-2021", category: "Rooms Cleaning" },
    { id: 2, topic: "Topic 2", date: "10-09-2020", category: "Wooden Works" },
    { id: 3, topic: "Topic 3", date: "14-03-2021", category: "Tank Cleaning" },
    { id: 4, topic: "Topic 4", date: "19-05-2020", category: "Gardening" },
    { id: 5, topic: "Topic 5", date: "20-10-2020", category: "Dusting" },
    { id: 6, topic: "Topic 6", date: "29-01-2021", category: "Ground Cleaning" },
  ]

  constructor(
    private location: Location,
    private backNavigateService: BackNavigateService,
  ) { }

  ngOnInit() {
    this.backNavigateService.back.subscribe(res => {
      this.backBtnState = res;
    });
  }

  toggleBack() {
    this.backNavigateService.toggleBackState();
  }

  back() {
    this.location.back();
  }

}
