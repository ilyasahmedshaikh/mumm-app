import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public tables: any = { 
    categoriesTable: 'categories',
    kindergartensTable: 'kindergartens',
    userTable: 'users',
    todoTable: 'todos',
    commentsTable: 'comments',
    todoSeenTable: 'todoSeen',
  }

  constructor() { }
}
