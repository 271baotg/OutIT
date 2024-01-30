export class Enrollment {
  code: string;
  name: string;
  type: string;
  term: number;
  total: number;

  constructor(
    code: string,
    name: string,
    type: string,
    term: number,
    total: number
  ) {
    this.code = code;
    this.name = name;
    this.type = type;
    this.term = term;
    this.total = total;
  }
}
