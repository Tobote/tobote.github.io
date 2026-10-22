import { TagModel } from './tag.model';

export interface ProjectModel {
    id: number;
    title: string;
    summary: string;
    description: string;
    projectUrl: string;
    pictures: string[];
    tags: TagModel[];
    /** Shown on the Home page. If no project is featured, the first one is used. */
    featured?: boolean;
}