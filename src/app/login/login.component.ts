import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { UserModel } from '../signup/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Formvalue ! :FormGroup;
  userModelObj : UserModel = new UserModel();

  constructor(private formb : FormBuilder, public rtr : Router , private api : ApiService, private authService: AuthService) { }


  ngOnInit(): void {
    this.Formvalue = this.formb.group(
      {
        firstname : [''],
        email : ['']
      }
    )

  }
  submit2(){
    this.rtr.navigate(["signup"]);
  }
  login() {
    this.api.getEmployee().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.firstName === this.Formvalue.value.firstname && a.email === this.Formvalue.value.email
      });

      if(user){
        alert("success");
        this.authService.login(user);
        this.Formvalue.reset();
        this.rtr.navigate(['profile']);
      }
      else{
        alert('user not found');
        this.rtr.navigate(['login']);
      }
    }, err=>{
       alert('something went wrong')
    })
  }
}
