export type EnumValues<T> = T[keyof T];
export type EnumKeys<T> = keyof T;
export type EnumType<T extends Record<string, any>> = T[keyof T];
