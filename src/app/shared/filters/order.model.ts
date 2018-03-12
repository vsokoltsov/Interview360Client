export class Order {
  public title: string;
  public key: string;

  constructor(title?: string, key?: string) {
    this.title = title;
    this.key = key;
  }
}
