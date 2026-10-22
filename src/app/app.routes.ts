import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Resume } from './resume/resume';
import { Portfolio } from './portfolio/portfolio';
import { Contact } from './contact/contact';

export const routes: Routes = [
    { path: 'home', component: Home, title: 'Célio Pimentel | Home' },
    { path: 'portfolio', component: Portfolio, title: 'Célio Pimentel | Portfolio' },
    { path: 'resume', component: Resume, title: 'Célio Pimentel | Resume' },
    { path: 'contact', component: Contact, title: 'Célio Pimentel | Contact' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
