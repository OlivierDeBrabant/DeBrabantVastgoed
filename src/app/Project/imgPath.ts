export interface ImgPathJson{
    imgPathID: number;
    path: string;
} 

export class ImgPath {
    imgPathID: number
    constructor(
        private _path: string
    ){}

    static fromJSON(json: ImgPathJson): ImgPath {
        const imgPath = new ImgPath(
          json.path
        );
            imgPath.imgPathID = json.imgPathID; 
        return imgPath;
      }
    
      toJSON(): ImgPathJson {
        return <ImgPathJson>{
          path: this._path
        };
      }
    get path(): string{
        return this._path
    }
    get pathID(): number{
        return this.imgPathID
    }
}
