import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu';
import { LoginComponent } from './pages/login/login';

@Component({
  imports: [RouterOutlet, MenuComponent, LoginComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  standalone: true,
})
export class App {
  protected readonly title = signal('meu-primeiro-app');
}
