import {Customer} from "../model/customer";
import {Operator} from "../model/operator";

export class AccountService {

  loggedIn : boolean = false;
  role : string = '';
  customer : Customer;
  operator : Operator;

  constructor(){

  }

  LogOut(){
    this.loggedIn=false;
    this.role='';
    this.customer=null;
    this.operator=null;
  }

  LogIn(role : string, acc : any){
    this.loggedIn=true;
    this.role= role;
    if(role=='customer'){
      this.customer = acc;
      this.operator = null;
    }else if(role == 'operator'){
      this.customer = null;
      this.operator = acc;
    }
  }
}
