import {Component, OnInit} from '@angular/core';
import {Usuario} from './model/Usuario';
import {UsuarioService} from './service/usuario.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MensagemService} from './service/mensagem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'test-programador-atlantico';

  constructor(public usuarioService: UsuarioService, public mensagemService: MensagemService) {
  }

  usuarios: any;
  showFormularioCadatro: boolean = false;
  mensagens: any;

  usuarioCadastro: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
    admin: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    createdDate: new FormControl('', [Validators.required]),
    updatedDate: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  mensagemUsuario: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required]),
    mensagem: new FormControl('', [Validators.required]),
  });

  // tslint:disable-next-line:typedef
  showFormularioMensagem: boolean = false;

  ngOnInit() {

    const user = new Usuario();

    this.refreshUsuarios();

  }

  refreshUsuarios(){
    this.usuarioService.getAllUsers().subscribe(usuariosData => {
      console.log(usuariosData);
      this.usuarios = usuariosData;
    });

  }

  refreshMensagens(){
    this.mensagemService.getAllMessages().subscribe(mensagens => {
      console.log(mensagens);
      this.mensagens = mensagens;
    });

  }

  inserirUsuario(){
    this.usuarioCadastro.patchValue(new Usuario());
  }

  saveUsuarioButtonClick(){
    const name = this.usuarioCadastro.get('name')?.value;
    const login = this.usuarioCadastro.get('login')?.value;
    const email = this.usuarioCadastro.get('email')?.value;
    const id = this.usuarioCadastro.get('id')?.value;

    let user = new Usuario();
    user.name = name;
    user.login = login;
    user.email = email;
    user.id = id;

    if( user.id != null ){
      this.usuarioService.insertUser(user).subscribe(result => {
        console.log(result);
        this.showFormularioCadatro = false;
        this.usuarioCadastro.patchValue(new Usuario());
        this.refreshUsuarios();
      });
    }else{
      this.usuarioService.editUser(user).subscribe(result => {
        this.showFormularioCadatro = false;
        this.usuarioCadastro.patchValue(new Usuario());
        this.refreshUsuarios();
      });
    }

  }

  clearUsuarioButtonClick(){
    this.usuarioCadastro.patchValue(new Usuario());
  }

  editUser(user: any) {
   this.showFormularioCadatro = true;
   this.usuarioCadastro.patchValue(user);
  }

  deleteUser(user: any) {
    this.usuarioService.deleteUser(user.id).subscribe(userDeleted => {
        this.refreshUsuarios();
    });
  }

  enviarEmailUserRest(user: any) {
    this.mensagemUsuario.patchValue(user);
  }

  enviarEmailUserSOAP(user: any) {
  }

  saveMemsagemButtonClick() {
    console.log('save mensagem button');
    const id = this.mensagemUsuario.get('id')?.value;
    const mensagem = this.mensagemUsuario.get('mensagem')?.value;

    if(id === ''){
      this.mensagemService.sendMensagemToAll(mensagem).subscribe(mensagem => {
        console.log(mensagem);
      });
    }else{
      this.mensagemService.sendMensagemUser(id,mensagem).subscribe(mensagem => {
        console.log(mensagem);
      });
    }


  }

  clearMemsagemButtonClick() {

  }

  changePasswordUser(user: any) {

  }

  inserirMensagemParaTodos() {
    this.mensagemUsuario.patchValue(new Usuario());
    this.showFormularioMensagem = true;
  }

  closeFormularioCadastro() {
    this.usuarioCadastro.patchValue(new Usuario());
    this.showFormularioCadatro = false;
  }

  closeFormularioMensagem() {
    this.mensagemUsuario.patchValue(new Usuario());
    this.showFormularioMensagem = false;
  }
}
