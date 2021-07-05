import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = {
      'Access-Control-Allow-Origin': 'application/json;charset=UTF-8',
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache'
    };

    return new HttpHeaders(headers);
  }

  public getAllUsers(){
    return this.http.get('http://localhost:8080/users/');
  }

  public insertUser(user: any){
    return this.http.post('http://localhost:8080/users/', user);
  }

  public editUser(user: any){
    return this.http.patch('http://localhost:8080/users/', user);
  }

  public deleteUser(id: any){
    return this.http.delete('http://localhost:8080/users/' + id);
  }

}
