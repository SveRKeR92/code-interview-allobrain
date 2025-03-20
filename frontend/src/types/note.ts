export class Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(id: number, title: string, content: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  updateNote(newTitle:string, newContent: string): void {
    this.title = newTitle;
    this.content = newContent;
  }

  toString(): string {
    return `Note [id=${this.id}, title=${this.title}, content=${this.content}, createdAt=${this.createdAt}, updatedAt=${this.updatedAt}]`;
  }
}