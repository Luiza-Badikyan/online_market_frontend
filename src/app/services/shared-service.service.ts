import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  adminFlag: boolean;
  userFlag: boolean;
  loginFlag: boolean;
  sidebarAdminVisibilityChange: Subject<boolean> = new Subject<boolean>();
  sidebarProfileVisibilityChange: Subject<boolean> = new Subject<boolean>();
  sidebarLoginVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.sidebarAdminVisibilityChange.subscribe((value) => {
      this.adminFlag = value;
    });
    this.sidebarProfileVisibilityChange.subscribe((value) => {
      this.userFlag = value;
    });
    this.sidebarLoginVisibilityChange.subscribe((value) => {
      this.loginFlag = value;
    })
  }

  adminVisibility() {
    this.sidebarAdminVisibilityChange.next(!this.adminFlag);
  }

  profileVisibility() {
    this.sidebarProfileVisibilityChange.next(!this.userFlag);
  }

  loginVisibility() {
    this.sidebarLoginVisibilityChange.next(!this.loginFlag);
  }

}
