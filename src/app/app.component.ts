import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mumm';

  constructor(
    private translate: TranslateService
  ) {
    this.translate.addLangs(['us', 'de'])
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
}
