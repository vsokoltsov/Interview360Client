import { Company } from '../companies/company.model';
import { Skill } from './skill.model';

export class Vacancy {
  public id: number;
  public title: string;
  public description: string;
  public salary: number;
  public active: boolean;
  public skills: Skill[];
  public company: Company;

  constructor(id?: number, title?: string, description?: string, salary?: number,
              active?: boolean, skills = null, company: Company = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.salary = salary;
    this.active = active;
    this.skills = skills;
    this.company = company;
  }
}
