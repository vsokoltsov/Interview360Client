export class Skill {
  public id: number;
  public name: string;
  public created_at: Date;

  constructor(id?: number, name?: string, created_at?: Date) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
  }
}
