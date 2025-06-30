import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {}
