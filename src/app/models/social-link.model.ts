export interface SocialLinkModel {
    name: string;
    /** Icon registered in MatIconRegistry (see social-link.ts), e.g. "linkedin", "github". */
    icon: string;
    url: string;
}
