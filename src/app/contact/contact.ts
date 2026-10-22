import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ContactItem } from '../contact-item/contact-item';
import { ContactItemModel } from '../models/contact-item.model';
import { SocialLinkModel } from '../models/social-link.model';
import { SocialLink } from '../social-link/social-link';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, TranslatePipe, ContactItem, SocialLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly translate = inject(TranslateService);

  protected readonly items = this.translatedList<ContactItemModel>('contact.items');
  protected readonly socialLinks = this.translatedList<SocialLinkModel>('contact.social');

  // stream() re-emits when the language changes; it returns the key itself if missing.
  private translatedList<T>(key: string): Signal<T[]> {
    return toSignal(
      this.translate
        .stream(key)
        .pipe(map((value) => (Array.isArray(value) ? (value as T[]) : []))),
      { initialValue: [] as T[] },
    );
  }
}
