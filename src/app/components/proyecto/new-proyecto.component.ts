import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ImageService } from 'src/app/service/image.service';
import { Proyecto } from 'src/app/model/proyecto';
import { Storage, ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
  nombre: string;
  descripcion: string;
  img: string = '';
  id: number = 0;

  constructor(
    private proyectoS: ProyectoService,
    private router: Router,
    public imageService: ImageService,
    private storage: Storage) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    console.log("create");
    const imagesRef = ref(this.storage, 'Imagen')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        this.img = await getDownloadURL(item);
        //console.log("la url es: " + this.img);
        
      }
      //console.log("la url definitiva es: " + this.img);
    
    const proyecto = new Proyecto(this.nombre, this.descripcion, this.img);
    this.proyectoS.save(proyecto).subscribe(
      data => {
        alert("proyecto creado correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("fallo al añadir el proyecto");
        this.router.navigate(['']);
      }
    )
    })
  }

  uploadImage($event: any): void{
    console.log("upload");
    this.img = this.imageService.url;
    
    const imagesRef = ref(this.storage, 'Imagen' )
    list(imagesRef)
    .then(response => {
      for(let item of response.items){
        this.id += 1;
        //console.log("la id es: " + this.id);
      }
      //console.log("la ultima id es: " + this.id);
      this.id += 1;
      const name = "proyecto_" + this.id;
      console.log("el id de esta imagen es: "+ this.id);
      /*utilizo los metodos de firebasestorage para contar los elementos y luego 
      generar un ID automatico para la img nueva. se que si luego quiero eliminar una
      imagen del storage provocaria que modifique una imagen ya existente, por eso
      estoy considerando que por ahora las imagenes no se borren del storage*/
      
      this.imageService.uploadImage($event, name);
      
      
    })
    .catch(error =>console.log(error))

    /*this.proyectoS.lista().subscribe(data => { this.proyectos = data;})
    for(let proyecto of this.proyectos){this.id = proyecto.id};
    this.id += 1;
    const name = "proyecto_" + this.id;
    this.imageService.uploadImage($event, name);
    
    creo seria una buena  manera de generar los indices pero sin el ultimo elemento no es 
    posible generar bien el primero*/
  }

  

  //no quiero repetir codigo pero al momento de crear una funcion para reutilizar codio cuando hago un return nunca me devuelve nada
}
