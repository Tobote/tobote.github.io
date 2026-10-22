export interface EducationModel {
    degree: string;
    institution: string;
    location?: string;
    /** Format: YYYY-MM */
    startDate: string;
    /** Format: YYYY-MM. Omit if still in progress. */
    endDate?: string;
    summary?: string;
}
