import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactItemModel } from '../models/contact-item.model';

@Component({
  selector: 'app-contact-item',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  readonly contactItem = input.required<ContactItemModel>();

  protected readonly isExternal = computed(() => this.contactItem().url?.startsWith('http') ?? false);
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.contactItem().value);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
