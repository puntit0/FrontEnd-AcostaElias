import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyecto: Proyecto[] = [];

  constructor(
    private proyectoS: ProyectoService,
    private tokenService: TokenService,
  ) { }

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.cargarProyecto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    if(this.tokenService.getAuthorities().includes('ROLE_ADMIN')){
      this.isAdmin = true; 
    } else {
      this.isAdmin = false;
    }
  }

  cargarProyecto():void {
    this.proyectoS.lista().subscribe(
      data => {
        this.proyecto = data;
      }
    )
  }

  delete(id: number):void {
    if(id != undefined){
      this.proyectoS.delete(id).subscribe(
        data => {
        this.cargarProyecto();
        },err => {
          alert("no se pudo borrar el proyecto");
        }
      )
    }
  }
}
