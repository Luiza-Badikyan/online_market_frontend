import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UsersService } from "../../services/users.service";
import { IUser } from "../../models/iuser";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Params } from "@angular/router";
import { IRole } from "../../models/irole";
import { Page } from "../../helpers/page";

@Component({
  selector: 'app-shared-datatable',
  templateUrl: './shared-datatable.component.html',
  styleUrls: ['./shared-datatable.component.css']
})
export class SharedDatatableComponent implements OnInit {
  @Input() description: string;
  @Input() users: IUser[] = [];
  @Input() roles: IRole[] = [];

  form: FormGroup;
  change: FormGroup;

  changeFile;

  rows;
  temp = [];
  columns = [];
  limit = 5;
  page = new Page();

  constructor(public ngxSmartModalService: NgxSmartModalService,
              private usersService: UsersService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('')
    });
    this.change = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      role: new FormControl(''),
      date: new FormControl(''),
    });


    console.log('***********', this.description);
    console.log('-----------', this.users);
    if (this.users) {
      this.temp =[...this.users];
      this.rows = this.users;
      this.columns = [{ name: 'firstName' }, { name: 'lastName' }, { name: 'email' }];


      // _*_*_*_*_*_*_*_ \\

      // this.columns = [
      //   { name: 'firstName', summaryFunc: cells => `${cells.length} total` },
      //   { name: 'lastName', summaryFunc: () => null },
      //   { name: 'email', summaryFunc: () => null },
      //   { name: 'role', summaryFunc: () => this.getGenderSummary()}
      // ];

      // _*_*_*_*_*_*_*_ \\

    }
    console.log('this.temp =[...this.users];', this.temp);
    console.log('roles => => => ngOnInit', this.roles);

    // this.setPage({ offset: 0 });

  }

  getRoles(valueId) {
    if (this.roles.length) {
      return this.roles.find(item => item._id === valueId).name;
    }
  }

      // _*_*_*_*_*_*_*_ \\

  getGenderSummary(): string {
    // NOTE: there should be logic to get required informations from server
    return '3 user, 2 admin';
  }

      // _*_*_*_*_*_*_*_ \\


  setPage(event) {
    this.route.queryParams.subscribe((params: Params)=>{
      console.log(event);
      const page = 0;
      this.limit = 3;

      this.usersService.getUsersByPagination(page, this.limit).subscribe(()=>{
        console.log(page);
        console.log(this.limit);
      })
    });
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log('val---', val);

    console.log(this.temp);
    const temp = this.temp.filter(function(d) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  load(userId) {
    console.log('aaa', userId);
    // this.change.patchValue(user);
    this.change.patchValue(this.rows.find(item => item._id === userId));
    this.ngxSmartModalService.getModal('myChangeModal'+userId).open()
  }

  handleFileInput1(event) {
    this.changeFile = event.target.files[0];
  }



  saveChanges(userId) {
    let data;
    if (this.changeFile) {
      data = new FormData();
      data.append('file', this.changeFile, this.changeFile.name);
      Object.keys(this.change.value).forEach(key => {
        data.append(key, this.change.value[key]);
      });
    } else {
      data = this.change.value;
    }

    if (JSON.stringify(this.rows) === JSON.stringify(this.users)) {
      this.usersService.change(userId, data).subscribe(() => {
        this.change.reset();
        this.usersService.getUsers().subscribe((data: IUser[]) => {
          this.users = data;
          this.rows = data;
          this.toastr.success('Your changes are successfully done.');
        });
      }, (err) => {
        this.toastr.error('Something went wrong. Try again', 'Error');
      });
    }
  }


  remove(userId) {
    console.log(userId);
    if (JSON.stringify(this.rows) === JSON.stringify(this.users)) {
      this.usersService.deleteUser(userId).subscribe(() => {
        this.rows = [...this.rows.filter(item => item._id !== userId)];
      });
    }
  }

  ngOnChanges() {
    this.rows = this.users;
  }

}
