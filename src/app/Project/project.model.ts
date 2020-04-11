interface ProjectJson {
  name: string;
  producten: string[];
  beschrijving: string;
}

export class Project {
  constructor(
    private _name: string,
    private _producten = new Array<string>(),
    private _beschrijving: string
  ) {}
  static fromJSON(json: ProjectJson): Project {
    const proj = new Project(json.name, json.producten, json.beschrijving);
    return proj;
  }

  get name(): string {
    return this._name;
  }

  get producten(): string[] {
    return this._producten;
  }

  get beschrijving(): string {
    return this._beschrijving;
  }
  addProduct(titel: string, prijs?: number, beschrijving?: string) {
    this._producten.push(`${titel || 1} ${beschrijving || ""} ${prijs}`);
  }
}
