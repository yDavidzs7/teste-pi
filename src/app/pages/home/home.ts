import { Component } from '@angular/core';
import { BannerComponent } from '../../shared/menu/banner/banner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent],
  template: `<app-banner></app-banner>`,
})
export class HomeComponent {}
