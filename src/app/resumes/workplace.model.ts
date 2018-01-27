import { Resume } from './resume.model';
import { Company } from '../companies/company.model';

export class Workplace {
  public id: number;
  public position: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public updatedAt: string;
  public resume: Resume;
  public company: Company;

  constructor(id?: number, position?: string, description?: string,
              start_date?: string, end_date?: string, updated_at?: string,
              resume?: Resume, company?: Company) {
    this.id = id;
    this.position = position;
    this.description = description;
    this.startDate = start_date;
    this.endDate = end_date;
    this.updatedAt = updated_at;
    this.resume = resume;
    this.company = company;
  }
}
