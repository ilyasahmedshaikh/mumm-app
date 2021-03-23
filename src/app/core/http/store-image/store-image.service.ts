import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreImageService {

  preview: any = "https://i.ibb.co/Sft7ZH9/school-building-vector-icon-illustration-building-landmark-icon-concept-white-isolated-138676-441.jpg";
  percent: number = 0;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imageUploaded: boolean = false;

  constructor(
    private storage: AngularFireStorage,
  ) { }

  uploadFile(event) {
    this.imageUploaded = !this.imageUploaded;
    
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(res => this.percent = res );
    
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(res => {
          this.preview = res;
          console.log(this.preview);
          this.imageUploaded = !this.imageUploaded;
        });
      })
    )
    .subscribe();
  }

  readURL(event: Event): void {
    if (event.target['files'] && event.target['files'][0]) {
      const file = event.target['files'][0];
      const reader = new FileReader();
      reader.onload = e => this.preview = reader.result;
      reader.readAsDataURL(file);
    }
    return this.preview;
  }

  resetPreviewImage() {
    this.preview = "https://i.ibb.co/Sft7ZH9/school-building-vector-icon-illustration-building-landmark-icon-concept-white-isolated-138676-441.jpg";
  }

}
