import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from '../../model/customeRegex';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent  implements OnInit{

         ngOnInit(): void {
                this.loginPass()
         }


      loginPass(){
            let loginPass =  new FormGroup({
                  password: new FormControl(null,[]),
                  confirmPassword: new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.password)])
            })
      }

}
