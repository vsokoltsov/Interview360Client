import { User } from '../auth/user.model';

export class Company {
  public id: number;
  public name: string;
  public description: string;
  public start_date: any;
  public attachment: {
    url: string,
    thumb_url: string,
    small_thumb_url: string,
    medium_url: string,
    medium_large_url: string,
    large_url: string
  };
  public employees: User[];

  constructor(id: number, name: string,
              description: string, start_date: any, attachment = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.start_date = start_date;
    this.attachment = attachment;
  }
}
