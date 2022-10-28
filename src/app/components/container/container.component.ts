import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  isAuthenticated?: boolean;
  isAdmin?: boolean;

  constructor() { }

  ngOnInit(): void {}

  save_auth($event: boolean): void {
    this.isAuthenticated = $event;
  }
  save_admin($event: boolean): void {
    this.isAdmin = $event;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.isAdmin = undefined;
  }

}
