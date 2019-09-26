import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {IRole} from "./irole";
import {ICart} from "./icart";

export interface IUser {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  resetPasswordToken: string,
  resetPasswordExpires: _date,
  image: string,
  date: _date,
  role: IRole,
  cart: ICart,
}

export interface Info {
  user: IUser
}
