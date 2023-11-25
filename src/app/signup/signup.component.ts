import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from './User';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  selectedImage: File | null = null; // Store the selected image file
  selectedImageurl : any; //

   Formvalue ! :FormGroup;
   userModelObj : UserModel = new UserModel();
  public updatedbox : any;

  constructor(private formb : FormBuilder, public rtr : Router , private api : ApiService ,private ngZone: NgZone) { }


  ngOnInit(): void {
    this.Formvalue = this.formb.group(
      {
        firstname : [''],
        lastname : [''],
        email : [''],
        mobile : [''],
        salary : [''],
        imageurl: [''] 
      }
    )

    setInterval(() => {
      this.ngZone.run(() => {
        this.sum2();
      });
    }, 250);
  }
  sum2() {
    this.updatedbox = this.api.box;
  }
  submit1(){
    this.rtr.navigate(["login"]);
  }  

  onImageSelected(event: any) {
    const file = event.target.files[0]; // Get the selected image file
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Set the selectedImage to the data URL of the image
        this.selectedImage = e.target.result.toString();
        this.selectedImageurl = this.selectedImage;
      };
  
      reader.readAsDataURL(file); // Read the image as a data URL
    }
  }


  postEmployeeDetails() {
    this.userModelObj.firstName = this.Formvalue.value.firstname;
    this.userModelObj.lastName = this.Formvalue.value.lastname;
    this.userModelObj.email = this.Formvalue.value.email;
    this.userModelObj.mobile = this.Formvalue.value.mobile;
    this.userModelObj.salary = this.Formvalue.value.salary;
    const imageurl = this.selectedImageurl ? this.selectedImageurl.toString() : '';
    console.log("This is from method",this.userModelObj);

if((this.userModelObj.firstName && this.userModelObj.lastName && this.userModelObj.email && this.userModelObj.mobile && this.userModelObj.salary) == ''){
   alert("please enter values");
}else{
    this.api.postEmployee(this.userModelObj, imageurl).subscribe(data1 => {
      // console.log(data1);
      alert('Employee added successfully');
      this.rtr.navigate(['login']);
      this.Formvalue.reset();
      this.selectedImage = null;
      this.selectedImageurl = null;
    },
    (error) => {
      console.error('Error in postEmployee:', error);
    });
  }
  }
  



    // postEmployeeDetails(){
  //   this.userModelObj.firstName = this.Formvalue.value.firstname;
  //   this.userModelObj.lastName = this.Formvalue.value.lastname;
  //   this.userModelObj.email = this.Formvalue.value.email;
  //   this.userModelObj.mobile = this.Formvalue.value.mobile;
  //   this.userModelObj.salary = this.Formvalue.value.salary;
  //   this.api.postEmployee(this.userModelObj).subscribe(data1=>{
  //     console.log(data1);
  //     alert("employee added sucessfully")
  //     this.Formvalue.reset();
  //   } )
  // }
}
