import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {}
