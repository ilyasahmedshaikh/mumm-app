import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Location } from '@angular/common'
import{ BackNavigateService } from '../../core/services/back-navigate/back-navigate.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input('data') data: any = [];
  @Input('title') title: any;

  placeholderImage: any = "./assets/img/default-kindergarten.png"

  backBtnState: boolean = false;

  constructor(
    private location: Location,
    private backNavigateService: BackNavigateService,
    private translate: TranslateService
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
