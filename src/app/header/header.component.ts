import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from "../services/shared-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // adminFlag: boolean;
  // userFlag: boolean;
  constructor(private sharedService: SharedServiceService) {
    // this.adminFlag = sharedService.adminFlag;
    // this.userFlag = sharedService.userFlag;
  }
  get adminFlag(): boolean {
    return this.sharedService.adminFlag;
  }
  get userFlag(): boolean {
    return this.sharedService.userFlag
  }
  get loginFlag(): boolean {
    return this.sharedService.loginFlag;
  }

  ngOnInit() {
    if (localStorage.getItem('role')) {
      if (localStorage.getItem('role')==='user') {
        // this.userFlag = true;
        this.sharedService.profileVisibility();
      } else {
        // this.adminFlag = true;
        this.sharedService.adminVisibility();
      }
    } else {
      this.sharedService.loginVisibility();
    }
  }
}
