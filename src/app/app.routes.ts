import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Resume } from './resume/resume';
import { Portfolio } from './portfolio/portfolio';
import { Contact } from './contact/contact';

// Titles are translation keys, resolved by TranslatedTitleStrategy.
export const routes: Routes = [
    { path: 'home', component: Home, title: 'navigation.home' },
    { path: 'portfolio', component: Portfolio, title: 'navigation.portfolio' },
    { path: 'resume', component: Resume, title: 'navigation.resume' },
    { path: 'contact', component: Contact, title: 'navigation.contact' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
