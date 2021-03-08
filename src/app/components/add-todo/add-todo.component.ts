import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  @Output() selectCategory = new EventEmitter<any>();

  categoryCollection: string = "categories";
  categories: any = [
    { Id: 1, name: "Kindergarten 1", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg" },
    { Id: 2, name: "Kindergarten 2", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg" },
    { Id: 3, name: "Kindergarten 3", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg" },
    { Id: 4, name: "Kindergarten 4", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg" },
    { Id: 5, name: "Kindergarten 5", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg" },
    { Id: 6, name: "Kindergarten 6", image: "https://cdn.britannica.com/51/141451-050-E76A9D3B/Kindergarten-classroom.jpg" },
  ];
  selectedCategory: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  categoryClicked(data) {
    this.selectedCategory = data;
    this.selectCategory.emit(data);
  }

}
