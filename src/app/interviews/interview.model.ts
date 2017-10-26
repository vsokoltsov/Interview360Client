import { Company } from '../companies/company.model';
import { Vacancy } from '../vacancies/vacancy.model';

export class Interview {
  public id: number;
  public vacancy_id: number;
  public company_id: number;
  public company: Company;
  public vacancy: Vacancy;
  public assigned_at: any;

  constructor(id?: number, vacancy_id?: number, company_id?: number,
              assigned_at?: any, company: Company = null,
              vacancy: Vacancy = null) {}
}
