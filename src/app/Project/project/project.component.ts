import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDataService } from '../project-data.service';
import { Project } from '../project.model';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() public project: Project;
  
  public imageUrl: string;
  private isImageLoading: boolean;
  public imageToShow: any;
  public proj: Project;
  
  constructor(private dataService: ProjectDataService, private http: HttpClient, public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.proj = this.project;
    if(this.proj.imgPaths.length != 0){
      this.getImageFromService(this.proj.imgPaths[0].path);
    }
  }
  
  getImage(){
    
    return this.imageToShow;
  }
  downloadImage(url: string): Observable<Blob> {

    var file = (url)
    return this.http.get(`${environment.apiUrl}/Upload/download?file=${file}`, { responseType: 'blob' });
  }
  

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }
  getImageFromService(url: string) {
    this.isImageLoading = true;
    this.downloadImage(url).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
}
}
