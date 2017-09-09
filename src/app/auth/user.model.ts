export class User {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(id: number, email: string,
              first_name: string, last_name: string) {
    this.id = id;
    this.email = email;
    this.firstName = first_name;
    this.lastName = last_name;
  }
}
