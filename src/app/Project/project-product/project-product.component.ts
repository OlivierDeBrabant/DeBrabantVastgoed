import { Component, OnInit, Input } from "@angular/core";
import { Project } from "../project.model";
import { ActivatedRoute } from "@angular/router";
import { ProjectDataService } from "../project-data.service";
@Component({
  selector: "app-project-product",
  templateUrl: "./project-product.component.html",
  styleUrls: ["./project-product.component.css"],
})
export class ProjectProductComponent implements OnInit {
  public project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectDataService: ProjectDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pa) =>
      this.projectDataService
        .getProject$(pa.get("id"))
        .subscribe((item) => (this.project = item, console.log('item:' + item)))
    );
  }
  
  get producten() {
    return this.project.producten;
  }
}
