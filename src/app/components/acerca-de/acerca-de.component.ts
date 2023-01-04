import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona: persona = null;

  constructor(public personaService: PersonaService, private tokenService: TokenService) { }
  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    this.cargarPersona();
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

  cargarPersona(): void{
    this.personaService.detail(1).subscribe(
      data=>{
        this.persona = data
      }
    )
  }

}
 