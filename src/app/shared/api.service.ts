import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

public box = true;

  
  constructor(private http : HttpClient) { }

  // postEmployee(data : any){
  //   return this.http.post<any>("http://localhost:3000/posts", data)
  //   // .pipe(map((res : any)=>{
  //   //   return res;
  //   // }))
  //  }

   getEmployee(){
    return this.http.get<any>("http://localhost:3000/posts")
  }

  postEmployee(userModelObj: any, imageurl: string) {
    const data = { ...userModelObj, imageurl };
    console.log("This data from api" ,data);
    return this.http.post<any>('http://localhost:3000/posts', data);
  }
}
