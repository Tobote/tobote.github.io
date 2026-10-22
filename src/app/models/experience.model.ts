export interface ExperienceProjectModel {
    name: string;
    description: string;
    technologies?: string[];
}

export interface ExperienceModel {
    role: string;
    company: string;
    location?: string;
    /** Format: YYYY-MM */
    startDate: string;
    /** Format: YYYY-MM. Omit for the current job. */
    endDate?: string;
    summary?: string;
    highlights?: string[];
    projects?: ExperienceProjectModel[];
    technologies?: string[];
}
