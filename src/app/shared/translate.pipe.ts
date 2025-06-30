import {
  Pipe,
  PipeTransform,
  inject,
  effect,
  ChangeDetectorRef,
} from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private i18n = inject(I18nService);
  private cdr = inject(ChangeDetectorRef);
  private currentLanguage = this.i18n.language();

  constructor() {
    // React to language changes using effect
    effect(() => {
      this.currentLanguage = this.i18n.language();
      // Force change detection when language changes
      setTimeout(() => this.cdr.markForCheck());
    });
  }

  transform(key: string, params?: { [key: string]: string }): string {
    return this.i18n.translate(key, params);
  }
}
