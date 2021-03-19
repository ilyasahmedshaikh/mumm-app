import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../core/http/api-call/api-call.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title: string = "Kindergartens"

  kindergartens: any = [
    { Id: 1, name: "Kindergarten 1", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg", count: 3 },
    { Id: 2, name: "Kindergarten 2", count: 2 },
    { Id: 3, name: "Kindergarten 3", image: "https://hamptonprep.org.uk/media/2635-QS_Hampton_Prep-062-1024x683.jpg" },
    { Id: 4, name: "Kindergarten 4" },
  ];

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
    let data = {
      name: "Awais",
      contact: "033127370765"
    }

    this.getAllKindergartens();
  }

  getRandom() {
    return Math.floor(Math.random() * 5) + 1;
  }

  getAllKindergartens() {
    this.apiCallService.getAll('kindergartens').subscribe(res => {
      console.log(res);
    })
  }

}
