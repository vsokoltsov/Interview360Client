export class PopupNotification {
  public id: string;
  public title: string;
  public type: string;
  public text: string;

  constructor(id?: string, title?: string, type?: string, text?: string) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.text = text;
  }
}
