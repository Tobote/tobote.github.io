import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideTranslateParser, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { LanguageService } from './services/language.service';
import { TranslatedTitleStrategy } from './services/translated-title.strategy';
import { ValueKeepingParser } from './services/value-keeping.parser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    { provide: TitleStrategy, useExisting: TranslatedTitleStrategy },
    provideTranslateService({
      fallbackLang: 'en',
      parser: provideTranslateParser(ValueKeepingParser),
    }),
    provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
    provideAppInitializer(() => {
      const language = inject(LanguageService);
      return language.use(language.detect());
    }),
  ]
};
