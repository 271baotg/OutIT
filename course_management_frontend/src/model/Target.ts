export class Target {
  type: string;
  total: number;
  goal: number;

  constructor(type: string, total: number, goal: number) {
    this.type = type;
    this.total = total;
    this.goal = goal;
  }
}
