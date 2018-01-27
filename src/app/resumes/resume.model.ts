import { Skill } from '../shared/skills/skill.model';
import { Workplace } from './workplace.model';

export class Resume {
  public id: number;
  public title: string;
  public description: string;
  public user: object;
  public salary: number;
  public skills: Skill[];
  public created_at: string;
  public updated_at: string;
  public workplaces: Workplace[];

  constructor(id?: number, title?: string,
    description?: string, user?: object, salary?: number, skills?: Skill[],
    created_at?: string, updated_at?: string, workplaces?: Workplace[]) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.user = user;
      this.salary = salary;
      this.skills = skills;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.workplaces = workplaces;
    }
}
