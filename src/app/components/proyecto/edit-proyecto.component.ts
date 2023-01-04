import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { Storage, ref, list, getDownloadURL} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {
  proyecto: Proyecto = null;
  url: string='';
  name: string='';

  constructor(
    private activatedRouter: ActivatedRoute,
    private proyectoS: ProyectoService,
    private router: Router,
    public imageService: ImageService,
    private storage: Storage) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoS.detail(id).subscribe(
      data => {
        this.proyecto = data;
      }, err => {
        alert("error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyecto.img = this.imageService.url;
    this.proyectoS.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("error al modificar la persona");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event: any){
    const id= this.activatedRouter.snapshot.params['id']
    console.log("id:"+ id);
    
    this.proyectoS.detail(id).subscribe(data => {this.proyecto = data });
    
      const imagesRef = ref(this.storage, 'Imagen')
      list(imagesRef)
      .then(async response => {
        for(let item of response.items){
          this.url = await getDownloadURL(item);
          if(this.url == this.proyecto.img){
            const name = item.name;
            this.imageService.uploadImage($event, name);
          }
        }
      })
    
    

    
  }
  /* disculpen, se que no son las formas correctas de hacerlo y los errores que
   se pueden causar, prometo cambiar todo el metodo de subida y edicion de imagenes.
   pero en este momento con el poco tiempo para la entrega lo dejare asi para que por 
   lo menos todas las secciones tengan funcionalidad
  */
}
