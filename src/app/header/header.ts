import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Nav } from '../nav/nav';
import { Language, LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, RouterLink, Nav],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly language = inject(LanguageService);

  protected readonly languages: { code: Language; label: string; name: string }[] = [
    { code: 'en', label: 'EN', name: 'languages.english' },
    { code: 'pt', label: 'PT', name: 'languages.portuguese' },
  ];

  protected setLanguage(code: Language): void {
    this.language.use(code, true);
  }
}
