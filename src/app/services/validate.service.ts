import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validatePassword(control: AbstractControl): {[key: string]: boolean} | null {

    if (control.value && control.value.length < 3 && !control.value.match([1-9]) || control.value.length < 5 && control.value.match('[A-Za-z]')) {
      console.log(control.value);
      console.log(control.value.length);
      return {'pass': true}
    }
    return null;
  }

}
