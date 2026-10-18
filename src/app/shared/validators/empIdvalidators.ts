import { AbstractControl, ValidationErrors } from "@angular/forms";

export class  EmpIdValidator{
   static isEmpIdValid(control:AbstractControl):ValidationErrors| null{
          let val  = control.value;
     if(!val){
               return null; //value of error
       }

      //For pattern
       let regExp = /^[A-Z]\d{3}$/;
       let isValid = regExp.test(val);

              if(isValid){
                 return null;
              }
              else{
                 return{
                    invalidEmp:'Employee id is invalid ! please enter correct id'
                  }
               }
      }



}
