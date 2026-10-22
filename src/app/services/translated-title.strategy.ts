import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const SITE_NAME = 'Célio Pimentel';

/** Treats each route's `title` as a translation key and updates the tab title when the language changes. */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private key?: string;

  constructor() {
    super();
    this.translate.onLangChange.subscribe(() => this.apply());
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.key = this.buildTitle(snapshot);
    this.apply();
  }

  private apply(): void {
    if (!this.key) {
      this.title.setTitle(SITE_NAME);
      return;
    }

    this.translate
      .get(this.key)
      .subscribe((page: string) => this.title.setTitle(`${SITE_NAME} | ${page}`));
  }
}
