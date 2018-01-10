export class Resume {
  public id: number;
  public title: string;
  public description: string;
  public user: object;
  public skills: object[];
  public created_at: string;
  public updated_at: string;

  constructor(id?: number, title?: string,
    description?: string, user?: object, skills?: object[],
    created_at?: string, updated_at?: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.user = user;
      this.skills = skills;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
}
