export class User {
  public id: number;
  public email: string;
  public first_name: string;
  public last_name: string;
  public attachment: {
    url: string,
    thumb_url: string,
    small_thumb_url: string,
    medium_url: string,
    medium_large_url: string,
    large_url: string
  };
  public roles: {};
  public role: {
    id: number,
    role: number
  };

  constructor(id?: number, email?: string,
              first_name?: string, last_name?: string, roles?: {}, role: any = null) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.roles = roles;
    this.role = role;
  }

  getRoleName() {
    if (this.role.role) {
      switch(this.role.role) {
        case 1:
          return 'CEO';
        case 2:
          return 'HR';
        case 3:
          return 'Candidate'
        case 4:
          return 'Employee';
        default:
          return 'Employee';
      }
    }
  }
}
