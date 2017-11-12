import { Company } from '../companies/company.model';
import { Vacancy } from '../vacancies/vacancy.model';
import { User } from '../auth/user.model';

export class Interview {
  public id: number;
  public vacancy_id: number;
  public candidate_id: number;
  public candidate: User;
  public vacancy: Vacancy;
  public assigned_at: any;
  public interviewees: User[];


  constructor(id?: number, vacancy_id?: number, candidate_id?: number,
              assigned_at?: any, candidate?: User,
              vacancy?: Vacancy, interviewees?: User[]) {
                this.id = id;
                this.vacancy_id = vacancy_id;
                this.candidate_id = candidate_id;
                this.assigned_at = assigned_at;
                this.candidate = candidate;
                this.vacancy = vacancy;
                this.interviewees = interviewees;
              }
}
