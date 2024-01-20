import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  singupForm!: FormGroup;
  genders = ['male','female'];
  forbiddenUsername = ['Chris','Anna'];

  ngOnInit(): void {
    this.singupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null,[Validators.required, Validators.email])
      }),
      gender : new FormControl('male'),
      hobbies: new FormArray([]),
    })
  }

  onSubmit(){
    console.log(this.singupForm)
  }
  getControls(){
    return (<FormArray>this.singupForm.get('hobbies')).controls;
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.singupForm.get('hobbies')).push(control);
  }
  forbiddenNames(control : FormControl) : { [s : string] : boolean} | null {
    if (control.value && this.forbiddenUsername.indexOf(control.value) !== -1){
      return {nameIsForbidden : true};
    }
    return  null;
  }
}
