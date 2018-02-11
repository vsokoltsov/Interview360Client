import { Resume } from './resume.model';

export class Contact {
  public id: number;
  public email: string;
  public phone: string;
  public phone_comment: string;
  public social_networks: Object;

  constructor(id?: number, email?: string, phone?: string,
    phone_comment?: string, social_networks?: {}) {
      this.id = id;
      this.email = email;
      this.phone = phone;
      this.phone_comment = phone_comment;
      this.social_networks = social_networks;
  }
}
