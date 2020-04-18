import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { Observable } from 'rxjs';
import { ProjectDataService } from '../project-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() prod : Product;

  public product: FormGroup;
  public project: Project;

  constructor(private _projectDataService: ProjectDataService, private _router: Router, private route: ActivatedRoute) { }
  @Output() public newProject = new EventEmitter<Product>();
  
  ngOnInit() {
      this.route.paramMap.subscribe((pa) =>
      this._projectDataService
        .getProject$(pa.get("id"))
        .subscribe((item) => (this.project = item, console.log('item:' + item)))
    );
    this.product = new FormGroup({
      titel: new FormControl(this.prod.titel, [Validators.required, Validators.minLength(5)]),
      oppervlakte: new FormControl(this.prod.oppervlakte),
      beschrijving: new FormControl(this.prod.beschrijving, [Validators.required, Validators.minLength(5)]),
      kostprijs: new FormControl(this.prod.kostprijs),
      type: new FormControl(this.prod.type, [Validators.required]),
      isVerkocht: new FormControl(this.prod.isVerkocht)
    })
  }
  onSubmit(){
    var flag = false;
    if(this.product.value.isVerkocht == true){
      flag = true;
    }
    const p = new Product(this.product.value.titel, this.product.value.oppervlakte, 
                            this.product.value.beschrijving, this.product.value.kostprijs, 
                            this.product.value.type, flag);
    //this.newProject.emit(p); 
    p._productID = this.prod.productID;
    var projectId = this.project.projectID.toString();
    var prodId = this.prod.productID.toString();
    this._projectDataService.editProduct(projectId, prodId, p);
    
      console.log("ProdID: " + prodId)
      console.log("projectID: " + projectId);
      console.log("Object product id:  " + p.productID)

    //this._router.navigate(['dashboard']);
  }
  deleteProduct(product: Product){
    var txt;
    if (confirm("Zeker dat u " + this.prod.titel + " van project " + this.project.naam + " wilt verwijderen?")) {
      var projectId = this.project.projectID.toString();
      var prodId = this.prod.productID.toString();

      this._projectDataService.deleteProduct(projectId, prodId, this.prod);
    } 
    document.getElementById("demo").innerHTML = txt;
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'Noodzakelijk';
    } else if (errors.minlength) {
      return `Minimum ${errors.minlength.requiredLength} 
        karakters gevraagd (momenteel ${errors.minlength.actualLength} karakters)`;
    }
  }
}
