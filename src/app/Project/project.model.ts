import { ImgPath, ImgPathJson } from "./imgPath";
import { Product, ProductJson } from "./product.model";

interface ProjectJson {
  projectID: number;
  naam: string;
  beschrijving: string;
  adres: string;
  producten: ProductJson[];
  imgPaths: ImgPathJson[];
}

export class Project {
  _projectID: number;
  constructor(
    private _naam: string,
    private _beschrijving: string,
    private _adres: string,
    private _producten = new Array<Product>(),
    private _imgPaths = new Array<ImgPath>()
  ) {}

  static fromJSON(json: ProjectJson): Project {
    const project = new Project(
      json.naam,
      json.beschrijving,
      json.adres,
      json.producten.map(Product.fromJSON),
      json.imgPaths.map(ImgPath.fromJSON)
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
  toJSONMetProducten(): ProjectJson {
    return <ProjectJson>{
      projectID: this._projectID,
      naam: this.naam,
      beschrijving: this.beschrijving,
      adres: this.adres,
      producten: this.producten,
      imgPaths: this.imgPaths
    };
  }
  get projectID(): number {
    return this._projectID;
  }
  set setProjectID(id: number){
    this._projectID = id;
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
  get imgPaths(): ImgPath[]{
    return this._imgPaths;
  }
  /*addProduct(titel: string, prijs?: number, beschrijving?: string) {
    this._producten.push(`${titel || 1} ${beschrijving || ""} ${prijs}`);
  }*/
}
