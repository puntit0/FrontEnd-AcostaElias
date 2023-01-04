import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL, uploadString} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = '';
  name: string = '';

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, 'Imagen/'+ name)
    uploadBytes(imgRef, file)
    .then(response => {this.updateImage(name)})
    .catch(error => console.log(error))
  }

  
  updateImage(name: string){
    const imagesRef = ref(this.storage, 'Imagen')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        if(item.fullPath == 'Imagen/' + name){
          this.url = await getDownloadURL(item);
          
        }
      }
    })
    .catch(error => console.log(error))
  }
}
