import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import { ProjectDataService } from '../project-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product: FormGroup;
  public project: Project;
  private _fetchProjects$: Observable<Project[]> = this._projectDataService.projects$;

  constructor(private _projectDataService: ProjectDataService, private _router: Router, private route: ActivatedRoute) { }
  @Output() public newProject = new EventEmitter<Product>();
  
  ngOnInit() {
      this.route.paramMap.subscribe((pa) =>
      this._projectDataService
        .getProject$(pa.get("id"))
        .subscribe((item) => (this.project = item, console.log('item:' + item)))
    );
    this.product = new FormGroup({
      titel: new FormControl('', [Validators.required, Validators.minLength(5)]),
      oppervlakte: new FormControl(''),
      beschrijving: new FormControl('', [Validators.required, Validators.minLength(5)]),
      kostprijs: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      isVerkocht: new FormControl('')
    })
  }
  onSubmit(){
    var flag = false;
    if(this.product.value.isVerkocht == true){
      flag = true;
    }
    console.log(flag)
    const p = new Product(this.product.value.titel, this.product.value.oppervlakte, 
                            this.product.value.beschrijving, this.product.value.kostprijs, 
                            this.product.value.type, flag);
    //this.newProject.emit(p); 
    var id = this.project.projectID.toString();
    this._projectDataService.addNewProduct(id, p);
    this._router.navigate(['dashboard']);
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