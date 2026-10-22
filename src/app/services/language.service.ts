import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type Language = 'en' | 'pt';

const STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly current = signal<Language>('en');

  /** Saved choice first, then the browser's preferred languages. */
  detect(): Language {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'pt') {
      return saved;
    }

    const preferredLanguages = navigator.languages ?? [navigator.language];
    return preferredLanguages.some((value) => value.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
  }

  use(language: Language, remember = false): Observable<unknown> {
    this.current.set(language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    if (remember) {
      localStorage.setItem(STORAGE_KEY, language);
    }

    return this.translate.use(language);
  }
}
