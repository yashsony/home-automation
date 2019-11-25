import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  parent = 'app-Component';
   loggedIn: boolean = false;
  user: any;

  constructor(public router: Router,) {

    this.user = firebase.auth().currentUser;
    
    if(this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      if(user){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }

    })

  }

  ngOnInit() {
  }

  signout(ev){
    
    this.user.signout;
    this.loggedIn = false ;
    this.router.navigate(['login']);
  }

  login(ev){
    this.router.navigate(['login']);
  }
  signup(ev){
    this.router.navigate(['signup']);
  }
}
