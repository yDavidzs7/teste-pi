import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cliente {
  nome: string;
  email: string;
  senha: string;
}

type TipoUsuario = 'cliente' | 'admin';
type Tela = 'login' | 'cadastro' | 'area';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  tela: Tela = 'login';
  tipoUsuario: TipoUsuario = 'cliente';

  nome = '';
  email = '';
  senha = '';

  emailLogin = '';
  senhaLogin = '';

  mensagem = '';
  tipoMensagem: 'erro' | 'sucesso' = 'erro';

  usuarioLogado = '';
  perfilLogado: TipoUsuario = 'cliente';

  private chaveStorage = 'rebirth_clientes';

  private lerClientes(): Cliente[] {
    try {
      return JSON.parse(
        localStorage.getItem(this.chaveStorage) || '[]'
      );
    } catch {
      return [];
    }
  }

  selecionarTipo(tipo: TipoUsuario): void {
    this.tipoUsuario = tipo;
    this.mensagem = '';
  }

  abrirCadastro(): void {
    this.tela = 'cadastro';
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.mensagem = '';
  }

  voltarLogin(): void {
    this.tela = 'login';
    this.mensagem = '';
  }

  cadastrar(): void {
    const nome = this.nome.trim();
    const email = this.email.trim().toLowerCase();

    if (!nome || !email || !this.senha) {
      this.mostrarMensagem(
        'Preencha todos os campos.',
        'erro'
      );
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      this.mostrarMensagem(
        'Digite um e-mail válido.',
        'erro'
      );
      return;
    }

    if (this.senha.length < 6) {
      this.mostrarMensagem(
        'A senha precisa ter pelo menos 6 caracteres.',
        'erro'
      );
      return;
    }

    const clientes = this.lerClientes();

    const existe = clientes.some(
      cliente => cliente.email.toLowerCase() === email
    );

    if (existe) {
      this.mostrarMensagem(
        'Este e-mail já está cadastrado.',
        'erro'
      );
      return;
    }

    clientes.push({
      nome,
      email,
      senha: this.senha
    });

    localStorage.setItem(
      this.chaveStorage,
      JSON.stringify(clientes)
    );

    this.emailLogin = email;
    this.senhaLogin = '';
    this.nome = '';
    this.email = '';
    this.senha = '';

    this.tipoUsuario = 'cliente';
    this.tela = 'login';

    this.mostrarMensagem(
      'Conta criada! Agora faça seu login.',
      'sucesso'
    );
  }

  entrar(): void {
    const email = this.emailLogin.trim().toLowerCase();
    const senha = this.senhaLogin;

    if (!email || !senha) {
      this.mostrarMensagem(
        'Informe seu e-mail e sua senha.',
        'erro'
      );
      return;
    }

    if (this.tipoUsuario === 'admin') {

      if (
        email === 'admin@rebirth.com' &&
        senha === 'Admin@123'
      ) {
        this.usuarioLogado = 'Administrador';
        this.perfilLogado = 'admin';
        this.tela = 'area';
        this.mensagem = '';
        return;
      }

      this.mostrarMensagem(
        'E-mail ou senha de administrador incorretos.',
        'erro'
      );
      return;
    }

    const cliente = this.lerClientes().find(
      usuario =>
        usuario.email.toLowerCase() === email &&
        usuario.senha === senha
    );

    if (!cliente) {
      this.mostrarMensagem(
        'E-mail ou senha incorretos. Confira seus dados ou cadastre-se.',
        'erro'
      );
      return;
    }

    this.usuarioLogado = cliente.nome;
    this.perfilLogado = 'cliente';
    this.tela = 'area';
    this.mensagem = '';
  }

  sair(): void {
    this.tela = 'login';
    this.tipoUsuario = 'cliente';
    this.emailLogin = '';
    this.senhaLogin = '';
    this.usuarioLogado = '';
    this.mensagem = '';
  }

  private mostrarMensagem(
    texto: string,
    tipo: 'erro' | 'sucesso'
  ): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }
}
