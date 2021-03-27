import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(
    private http: HttpClient
  ) { }

  post(table, data) {
    return this.http.post(`${environment.API_BASE_URL}/${table}.json`, data);
  }

  getAll(table) {
    return this.http.get(`${environment.API_BASE_URL}/${table}.json`);
  }

  getSingle(table, id) {
    return this.http.get(`${environment.API_BASE_URL}/${table}/${id}.json`);
  }

  put(table, id, data) {
    return this.http.put(`${environment.API_BASE_URL}/${table}/${id}.json`, data);
  }

  delete(table, id) {
    return this.http.delete(`${environment.API_BASE_URL}/${table}/${id}.json`);
  }

  formatDataListing(res) {
    let data = Object.entries(res);
    let formatted = [];  

    data.forEach(item => {
      formatted.push({
        Id: item[0],
        ...item[1] as {}
      })
    });

    return formatted.reverse();
  }

}
