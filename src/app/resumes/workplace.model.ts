import { Resume } from './resume.model';
import { Company } from '../companies/company.model';

export class Workplace {
  public id: number;
  public position: string;
  public description: string;
  public start_date: string;
  public end_date: string;
  public updatedAt: string;
  public resume: Resume;
  public company: Company;

  constructor(id?: number, position?: string, description?: string,
              start_date?: string, end_date?: string, updated_at?: string,
              resume?: Resume, company?: Company) {
    this.id = id;
    this.position = position;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.updatedAt = updated_at;
    this.resume = resume;
    this.company = company;
  }
}
