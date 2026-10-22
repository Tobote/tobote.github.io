import { TagModel } from './tag.model';

export interface ProjectModel {
    id: number;
    title: string;
    summary: string;
    description: string;
    projectUrl: string;
    pictures: string[];
    tags: TagModel[];
}