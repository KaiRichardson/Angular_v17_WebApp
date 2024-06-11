import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss'
})
export class ButtonPageComponent { }
