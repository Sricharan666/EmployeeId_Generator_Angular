import { Component } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService) {}
  title = 'demo';
  myFunc(){
    this.apiService.box = !this.apiService.box;
    console.log("application", this.apiService.box);
  }
}