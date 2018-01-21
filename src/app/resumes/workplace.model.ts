export class Workplace {
  public id: number;
  public position: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public updatedAt: string;

  constructor(id?: number, position?: string, description?: string,
              start_date?: string, end_date?: string, updated_at?: string
              ) {
    this.id = id;
    this.position = position;
    this.description = description;
    this.startDate = start_date;
    this.endDate = end_date;
    this.updatedAt = updated_at;
  }
}
