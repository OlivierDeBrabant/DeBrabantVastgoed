import { Product, ProductJson } from "./product.model";

interface ProjectJson {
  projectID: number;
  naam: string;
  beschrijving: string;
  adres: string;
  producten: ProductJson[];
}

export class Project {
  private _projectID: number;
  constructor(
    private _naam: string,
    private _beschrijving: string,
    private _adres: string,
    private _producten = new Array<Product>()
  ) {}

  static fromJSON(json: ProjectJson): Project {
    const project = new Project(
      json.naam,
      json.beschrijving,
      json.adres,
      json.producten.map(Product.fromJSON)
    );
    project._projectID = json.projectID;
    return project;
  }

  toJSON(): ProjectJson {
    return <ProjectJson>{
      naam: this.naam,
      beschrijving: this.beschrijving,
      adres: this.adres,
    };
  }

  get projectID(): number {
    return this._projectID;
  }
  get naam(): string {
    return this._naam;
  }

  get producten(): Product[] {
    return this._producten;
  }

  get beschrijving(): string {
    return this._beschrijving;
  }
  get adres(): string {
    return this._adres;
  }
  get naamZonderSpatie(): string {
    return this._naam.replace(/\s/g, "");
  }
  /*addProduct(titel: string, prijs?: number, beschrijving?: string) {
    this._producten.push(`${titel || 1} ${beschrijving || ""} ${prijs}`);
  }*/
}
