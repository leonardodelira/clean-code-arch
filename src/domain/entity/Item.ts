export class Item {
  constructor(
    public id: string,
    public description: string,
    public price: number,
    public width: number,
    public height: number,
    public length: number,
    public weight: number
  ) {}

  getVolume() {
    return (this.width / 100) * (this.height / 100) * (this.length / 100);
  }

  getDensity() {
    return this.weight / this.getVolume();
  }
}
