export class Company {
  public id: number;
  public name: string;
  public description: string;
  public start_date: any;
  public attachment: { url: string};

  constructor(id: number, name: string,
              description: string, start_date: any) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.start_date = start_date;
  }
}
