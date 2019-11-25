import { Component, OnInit,EventEmitter, Input,Output } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';
import {ViewEncapsulation} from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import 'firebase/auth';
import { error } from 'util';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',
  ],
  
  
})
export class MenuComponent implements OnInit {
  i : any[9];
  items: Observable<any[]>;
  isdataloaded = false ;
  j : any;

constructor( public router: Router, db: AngularFireDatabase) {
  this.i = [];
  this.j =  db.list('switch');
  this.items = this.j.valueChanges();
  this.items.subscribe(actions => {



    const myObjStr = JSON.stringify(actions);
    var res1 = myObjStr.split("[");
    var res2 = res1[1].split("]");
    this.i = res2[0].split(",");
    let that = this
    this.isdataloaded = true ;
    console.log(this.i);
    setTimeout( function(){
      if(that.i[0]  == "true")  (<HTMLInputElement>document.getElementById("1")).checked = that.i[0];
      if(that.i[1] == "true")  (<HTMLInputElement>document.getElementById("2")).checked = that.i[1];
      if(that.i[2] == "true")  (<HTMLInputElement>document.getElementById("3")).checked = that.i[2];
      if(that.i[3] == "true")  (<HTMLInputElement>document.getElementById("4")).checked = that.i[3];
      if(that.i[4] == "true")  (<HTMLInputElement>document.getElementById("5")).checked = that.i[4];
      if(that.i[5] == "true")  (<HTMLInputElement>document.getElementById("6")).checked = that.i[5];
      if(that.i[6] == "true")  (<HTMLInputElement>document.getElementById("7")).checked = that.i[6];
      if(that.i[7] == "true")  (<HTMLInputElement>document.getElementById("8")).checked = that.i[7];
      if(that.i[8] == "true")  (<HTMLInputElement>document.getElementById("9")).checked = that.i[8];
    },500)
   
  });
}



ngOnInit() {
  
  }
  
onsubmit(event){ 
  
  this.j.update('/',{
    "1": (<HTMLInputElement>document.getElementById("1")).checked
  ,"2": (<HTMLInputElement>document.getElementById("2")).checked
  ,"3": (<HTMLInputElement>document.getElementById("3")).checked
  ,"4": (<HTMLInputElement>document.getElementById("4")).checked
  ,"5": (<HTMLInputElement>document.getElementById("5")).checked
  ,"6": (<HTMLInputElement>document.getElementById("6")).checked
  ,"7": (<HTMLInputElement>document.getElementById("7")).checked
  ,"8":  (<HTMLInputElement>document.getElementById("8")).checked
  ,"9":  (<HTMLInputElement>document.getElementById("9")).checked
}).then(
  (act)=>{
    alert("your changes have been  updated successfully to FIREBASE DATABASE");
  })
  .catch((error) => {
   alert("ooops !connection problem...try one more time")
  });


}

signout(ev){
  this.router.navigate(['login']);
}








}
