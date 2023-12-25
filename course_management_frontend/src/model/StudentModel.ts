class StudentModel {
    id?: number;
    username: string;
    password: string;
    fullName:string;
    className: string
    constructor(
        username: string,
        password: string,
        fullName: string,
        className: string,
        id?:number){
            this.username = username;
            this.password = password;
            this.fullName = fullName;
            this.className = className;
            this.id = id;
        }

}