export class OrderCode {
  value: string;

  constructor(issueDate: Date = new Date(), sequence: number = 1) {
    this.value = `${issueDate.getFullYear()}${new String(sequence).padStart(8, '0')}`;
  }
}
