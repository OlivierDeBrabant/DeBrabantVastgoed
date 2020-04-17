import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'app-dasboard-product',
  templateUrl: './dasboard-product.component.html',
  styleUrls: ['./dasboard-product.component.css']
})
export class DasboardProductComponent implements OnInit {
  public project: Project;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private projectDataService: ProjectDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pa) =>
      this.projectDataService
        .getProject$(pa.get("id"))
        .subscribe((item) => (this.project = item, console.log('item:' + item)))
    );
    console.log(this.project.naam)
  }
  
  get producten() {
    return this.project.producten;
  }
  addProduct(){
    this._router.navigate(['dashboard/project/', this.project.projectID, 'addproduct'])
  }
}
