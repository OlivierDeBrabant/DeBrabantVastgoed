interface ProjectJson {
  naam: string;
  beschrijving: string;
  adres: string;
  producten: string[];
}

export class Project {
  constructor(
    private _naam: string,
    private _beschrijving: string,
    private _adres: string,
    private _producten = new Array<string>()
  ) {}
  static fromJSON(json: ProjectJson): Project {
    const project = new Project(json.naam, json.beschrijving, json.adres, json.producten);
    return project;
  }
  toJSON(): ProjectJson {
    return <ProjectJson>{
    naam: this.naam,
    beschrijving: this.beschrijving,
    adres: this.adres
    };
  }
  get naam(): string {
    return this._naam;
  }

  get producten(): string[] {
    return this._producten;
  }

  get beschrijving(): string {
    return this._beschrijving;
  }
  get adres(): string{
    return this._adres;
  }
  get naamZonderSpatie(): string{
    return this._naam.replace(/\s/g, "");
  }
  /*addProduct(titel: string, prijs?: number, beschrijving?: string) {
    this._producten.push(`${titel || 1} ${beschrijving || ""} ${prijs}`);
  }*/
}
