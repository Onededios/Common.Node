/**
 * Extracts the union of all values from an enum-like object.
 *
 * @example
 * enum Color { Red = "red", Blue = "blue" }
 * type ColorValues = EnumValues<typeof Color>; // "red" | "blue"
 */
export type EnumValues<T> = T[keyof T];

/**
 * Extracts the union of all keys from an enum-like object.
 *
 * @example
 * enum Color { Red = "red", Blue = "blue" }
 * type ColorKeys = EnumKeys<typeof Color>; // "Red" | "Blue"
 */
export type EnumKeys<T> = keyof T;

/**
 * Alias for extracting the union of all values from an enum-like object.
 * Useful for semantic clarity.
 *
 * @example
 * enum Status { Active = 1, Inactive = 0 }
 * type StatusType = EnumType<typeof Status>; // 1 | 0
 */
export type EnumType<T extends Record<string, any>> = T[keyof T];
