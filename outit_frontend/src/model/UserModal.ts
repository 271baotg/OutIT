export class UserModal {
  username: string;
  fullName: string;
  email: string;
  className: string;

  constructor(
    username: string,
    fullName: string,
    email: string,
    className: string
  ) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.className = className;
  }
}
