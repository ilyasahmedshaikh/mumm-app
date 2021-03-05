import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Homepage', url: 'homepage', icon: 'home' },
    { title: 'Todo', url: 'todo', icon: 'add' },
  ];

  public labels = ['Family', 'Friends', 'Notes'];
  
  constructor() {}
}
