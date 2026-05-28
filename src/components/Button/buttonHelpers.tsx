export const ButtonTypes = ['default', 'link', 'text'] as const;
export type ButtonType = (typeof ButtonTypes)[number];
