import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  employeeData ! : any;


  constructor(private formb : FormBuilder, private api : ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }
  getAllEmployee(){
    if (this.authService.loggedInUser) {
    const userId = this.authService.loggedInUser.id; 
    this.api.getEmployee().subscribe(data2=>{
      console.log(data2);
      this.employeeData = data2.filter((user: any) => user.id === userId);
    });
  }
  }

}
