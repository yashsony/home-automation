import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup , FormControl , Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm : FormGroup;
  message :string = "";
  userError :any;
 
  constructor(public fb : FormBuilder , public router: Router) {
    this.myForm = this.fb.group({
      email : ['',[Validators.email ,Validators.required]],
      password : ['', [Validators.required]]
    })
   }

  ngOnInit() {
  }
  onSubmit(form){
    // let that = this;
    firebase.auth().signInWithEmailAndPassword(form.value.email , form.value.password).then((data)=>{
      this.message ="you r loged in";
      
      this.router.navigate(['home']);
    }).catch((error) =>{
      this.userError = error;
    })
  }
}
