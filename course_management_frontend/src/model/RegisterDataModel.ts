import { Target } from "./Target";


class RegisterDataModel {

    username: string;
    password:string;
    email:string;
    fullName:string;
    className: string;
    targetList: Target[];

    constructor(username: string,
        password:string,
        email:string,
        fullName:string,
        className: string,
        targets:Target[]){
            this.username = username;
            this.password = password;
            this.email = email;
            this.fullName = fullName;
            this.className = className;
            this.targetList = targets;
        }


}

export default RegisterDataModel;