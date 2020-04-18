export interface ProductJson {
  productID: number;
  titel: string;
  oppervlakte: number;
  beschrijving: string;
  kostprijs: number;
  type: string;
  isVerkocht: boolean;
}
export class Product {
  _productID: number;
  constructor(
    private _titel: string,
    private _oppervlakte: number,
    private _beschrijving: string,
    private _kostprijs: number,
    private _type: string,
    private _isVerkocht: boolean
  ) {}

  static fromJSON(json: ProductJson): Product {
    const product = new Product(
      json.titel,
      json.oppervlakte,
      json.beschrijving,
      json.kostprijs,
      json.type,
      json.isVerkocht
    );
        product._productID = json.productID; 
    return product;
  }

  toJSON(): ProductJson {
    return <ProductJson>{
      titel: this.titel,
      oppervlakte: this.oppervlakte,
      beschrijving: this.beschrijving,
      kostprijs: this.kostprijs,
      type: this.type,
      isVerkocht: this.isVerkocht
    };
  }

  get productID(){
    return this._productID;
  }
  get titel() {
    return this._titel;
  }
  get oppervlakte() {
    return this._oppervlakte;
  }
  get beschrijving() {
    return this._beschrijving;
  }
  get kostprijs() {
    return this._kostprijs;
  }
  get type() {
    return this._type;
  }
  get isVerkocht() {
    return this._isVerkocht;
  }
  get kostprijsMetDefault(){
    if(this.kostprijs==0 || this.kostprijs==null || typeof this.kostprijs === 'undefined' || this.isVerkocht){
      return "Niet bekend"
    }
    return '€ ' + this.kostprijs;
  }
  get naamFoto(){
    return this.titel.replace(/\s/g, "");
  }
}
