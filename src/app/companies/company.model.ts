import { User } from '../auth/user.model';
import { Vacancy } from '../vacancies/vacancy.model';
import { Interview } from '../interviews/interview.model';

export class Company {
  public id: number;
  public name: string;
  public description: string;
  public start_date: any;
  public city: string;
  public attachment: {
    url: string,
    thumb_url: string,
    small_thumb_url: string,
    medium_url: string,
    medium_large_url: string,
    large_url: string
  } = null;
  public employees: User[] = null;
  public vacancy_count: number;
  public employees_count: number;
  public vacancies: Vacancy[];
  public interviews: Interview[];

  constructor(id?: number, name?: string,
              description?: string, start_date?: any, city?: string,
              attachment = null, employees: User[] = null,
              interviews: Interview[] = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.start_date = start_date;
    this.city = city;
    this.attachment = attachment;
    this.employees = employees;
    this.interviews = interviews;
  }
}
