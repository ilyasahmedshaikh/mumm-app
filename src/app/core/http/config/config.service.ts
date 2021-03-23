import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  tables: any = { 
    categoriesTable: 'categories',
    kindergartensTable: 'kindergartens',
    craftmanTable: 'craftmans',
    todoTable: 'todos',
    commentsTable: 'comments',
  }

  constructor() { }
}
