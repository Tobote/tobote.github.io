export interface ContactItemModel {
    /** Material icon name, e.g. "email", "location_on", "phone". */
    icon: string;
    label: string;
    value: string;
    /** When present, the value becomes a link (mailto:, tel: or https://). */
    url?: string;
    /** Shows a button that copies the value to the clipboard. */
    copyable?: boolean;
}
