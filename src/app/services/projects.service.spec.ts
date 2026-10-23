import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  TranslateService,
  TranslationObject,
  provideTranslateParser,
  provideTranslateService,
} from '@ngx-translate/core';
import { TagModel } from '../models/tag.model';
import { ProjectsService } from './projects.service';
import { ValueKeepingParser } from './value-keeping.parser';

const REPO = {
  name: 'my-app',
  description: 'From GitHub',
  html_url: 'https://github.com/Tobote/my-app',
  language: 'C#',
  topics: ['nodejs'],
  fork: false,
  archived: false,
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService({
          fallbackLang: 'en',
          parser: provideTranslateParser(ValueKeepingParser),
        }),
      ],
    });

    const translate = TestBed.inject(TranslateService);
    // The typings only allow strings, but the real i18n JSON files also hold numbers (ids).
    translate.setTranslation('en', {
      portfolio: {
        projects: [
          { id: 0, title: 'Only in JSON', summary: 'Curated', tags: ['Angular'] },
          { id: 1, repo: 'my-app', summary: 'Translated summary', featured: true },
        ],
      },
    } as unknown as TranslationObject);
    translate.use('en');

    service = TestBed.inject(ProjectsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function respond(repos: object[]): void {
    service.projects();
    http
      .expectOne((request) => request.url === 'https://api.github.com/users/Tobote/repos')
      .flush(repos);
  }

  it('merges JSON entries with their repository and appends the other repositories', () => {
    respond([
      { ...REPO, id: 100 },
      { ...REPO, id: 101, name: 'other', topics: ['featured'] },
      { ...REPO, id: 102, name: 'forked', fork: true },
      { ...REPO, id: 103, name: 'tobote.github.io' },
    ]);

    const [curated, merged, other, ...rest] = service.projects();

    expect(curated).toMatchObject({ id: 0, title: 'Only in JSON', tags: [TagModel.ANGULAR] });
    expect(merged).toMatchObject({
      id: 1,
      title: 'my-app',
      summary: 'Translated summary',
      projectUrl: REPO.html_url,
      tags: [TagModel.CSHARP, TagModel.NODEJS],
      featured: true,
    });
    expect(other).toMatchObject({
      id: 101,
      title: 'other',
      summary: 'From GitHub',
      featured: true,
    });
    expect(rest).toEqual([]);
  });

  it('keeps the JSON projects when GitHub fails', () => {
    service.projects();
    http.expectOne(() => true).flush('rate limited', { status: 403, statusText: 'Forbidden' });

    expect(service.projects().map((project) => project.id)).toEqual([0, 1]);
  });
});
