import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpIdValidator } from '../../validators/empIdvalidators';
import { Iciti } from '../../model/citizenshipmodel';
import { CITIZENSHIPS } from '../../const/citizenship';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  userlogin!:FormGroup;
citizenship: Iciti[]= CITIZENSHIPS;

   ngOnInit(): void{
         this.onCreate();
         this.valueChanges();
         this.patchValue();
         this.onAddSkill();

   }


  valueChanges(){
    this.userlogin.get('address.current')?.valueChanges
            .subscribe(res=>{
               console.log(res);
               if(this.userlogin.get('address.current')?.valid){
                    this.controls['isAddSame'].enable();
               }else{
                    this.controls['isAddSame'].reset();
                    this.controls['isAddSame'].disable();

               }

            })

   }

   patchValue(){
    this.userlogin.get('isAddSame')?.valueChanges
           .subscribe(res=>{
             if(res){
                 let currentAdd = this.userlogin.get('address.current')?.value;
                     this.userlogin.get('address.permanant')?.patchValue(currentAdd);
                     this.userlogin.get('address.permanant')?.disable();
                }
                else{
                    this.userlogin.get('address.permanant')?.reset();
                    this.userlogin.get('address.permanant')?.enable();
                }
           })
   }

  onCreate(){
     this.userlogin = new FormGroup({
              username :new FormControl('',[Validators.required]) ,
              email: new FormControl('',[Validators.required],[]),
              empId: new FormControl(null,[Validators.required,EmpIdValidator.isEmpIdValid]),
              address: new  FormGroup({
                   current: new FormGroup({
                          city: new FormControl(null,[Validators.required]),
                          state:  new FormControl(null,[Validators.required]),
                          country: new FormControl('India',[Validators.required]),
                          pincode: new FormControl(null,[Validators.required])
                   }),

                   permanant: new FormGroup({
                             city:  new FormControl(null,[Validators.required]),
                            state:  new FormControl(null,[Validators.required]),
                          country:  new FormControl('India',[Validators.required]),
                          pincode:  new FormControl(null,[Validators.required])

                   })
                }),

                isAddSame: new FormControl({value:false , disabled:true}),
                Skills : new FormArray([]) ,
                 dependents: new FormArray([])
             })
          }

  loggedIn(){
         console.log(this.userlogin.controls);
         console.log(this.userlogin.status);
        }


      get controls(){
         return this.userlogin.controls;
         }

      get employeeId(){
            return  this.userlogin.get('empId') as FormControl //to select single control
         }

         get Add(){
            return (this.controls['address'] as FormGroup).controls;
         }
         get curAdd(){
          return (this.Add['current'] as FormGroup).controls //to select
         }

      get curCity(){
          return this.userlogin.get('address.current.city') as FormControl // to select single control
        }


      get skillsArr(){
           return this.userlogin.get('Skills') as FormArray; // to select FormArray
        }



onRemove(i:number){
this.skillsArr.removeAt(i);
}
onAddSkill(){
  if(this.skillsArr.valid){
    let control = new FormControl(null,[Validators.required]);
this.skillsArr.push(control)
  }
}


get denpendantsArr(){
   return this.userlogin.get('dependents') as FormArray;
}

}
