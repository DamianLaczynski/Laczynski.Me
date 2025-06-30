import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-innovation',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './innovation.component.html',
  styleUrl: './innovation.component.scss',
})
export class InnovationComponent {}
