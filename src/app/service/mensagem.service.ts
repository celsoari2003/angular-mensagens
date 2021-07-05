import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(public http: HttpClient) { }


  public sendMensagemToAll(mensagem: string){
    return this.http.post('http://localhost:8080/users/email/' , mensagem);
  }

  public sendMensagemUser(id: any, mensagem: string){
     return this.http.post('http://localhost:8080/users/email/' + id, mensagem);
  }

  public getAllMessages(){
    return this.http.get('http://localhost:8090/message/');
  }

}
