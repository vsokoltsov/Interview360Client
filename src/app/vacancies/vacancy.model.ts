import { Company } from '../companies/company.model';
import { Skill } from '../shared/skills/skill.model';
import { Interview } from '../interviews/interview.model';

export class Vacancy {
  public id: number;
  public title: string;
  public description: string;
  public salary: number;
  public active: boolean;
  public skills: Skill[];
  public company_id: number;
  public company: Company;
  public updated_at: any;
  public interviews: Interview[];

  constructor(id?: number, title?: string, description?: string, salary?: number,
              active?: boolean, company_id?: number, updated_at?: any, skills = null,
              company: Company = null, interviews: Interview[] = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.salary = salary;
    this.active = active;
    this.skills = skills;
    this.company = company;
    this.updated_at = updated_at;
    this.interviews = interviews;
  }
}
