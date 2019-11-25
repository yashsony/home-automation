import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup , FormControl , Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm : FormGroup;
  
  userError : any ;
  message = "";
  constructor(public fb :FormBuilder, public router: Router) {
    this.myForm = this.fb.group({
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]],
      email : ['', [Validators.required]],
      password : ['', [Validators.required , Validators.minLength(8)]],
      confirmpassword : ['' ]
    },{
     validator : this.checkIfMatchingPasswords("password" , "confirmpassword")
    }
    )
   }

  ngOnInit() {
    
    
  }

  

  onSubmit(SignupForm){
    let email :string = SignupForm.value.email;
    let password :string = SignupForm.value.password;
    let firstname :string = SignupForm.value.firstname;
    let lastname :string = SignupForm.value.lastname;
    let that = this
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function(response) {
      console.log(response);
      let randomnumber = Math.floor(Math.random()*10000)
       let that1 =that
      response.user.updateProfile({
        displayName : firstname + " " + lastname,
        photoURL : "https://api.adorable.io/avatars/" + randomnumber

      }).then(()=>{
        that1.router.navigate(['login']);
      that.message = "you have been successfully Signup";
      
      
      })
    }).catch((error)=>{
      this.userError = error;
    })
  }



  checkIfMatchingPasswords(passwordKey : string , confirmpasswordKey : string){
    return (group :FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmpassword = group.controls[confirmpasswordKey];
      
      if(password.value == confirmpassword.value) {  return ;}
      else{ confirmpassword.setErrors({notEqualToPassword : true}) }
    }
  }




}
