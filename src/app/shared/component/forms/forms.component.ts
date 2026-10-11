import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  userlogin!:FormGroup;

   ngOnInit(): void{
         this.onCreate();
   }


  onCreate(){
     this.userlogin = new FormGroup({
              username :new FormControl('',[Validators.required]) ,
              email: new FormControl('',[Validators.required],[])
           })
  }

  loggedIn(){
         console.log(this.userlogin.controls);
         console.log(this.userlogin.status);
      }


}
