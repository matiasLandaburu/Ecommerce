import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuarioUrl } from 'src/config/api';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {  
  }
  
  getUsers(): Observable<any> {
    
    return  this.http.get<Usuario[]>(usuarioUrl)
  }

  createNewUser( usuario:Usuario ):Observable<any>{

  
    return this.http.post(usuarioUrl,{usuario})
  }
}
