import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';

export const NAV_LINKS = [
  { path: '/home', label: 'navigation.home' },
  { path: '/portfolio', label: 'navigation.portfolio' },
  { path: '/resume', label: 'navigation.resume' },
  { path: '/contact', label: 'navigation.contact' },
];

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, MatIconModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  constructor() {
    // Close the mobile menu after navigating.
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }
}
