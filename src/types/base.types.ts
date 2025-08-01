type Segment<N extends number> = string & { length: N };

export type GUID = `${string & Segment<8>}-${string & Segment<4>}-${string & Segment<4>}-${string & Segment<4>}-${string & Segment<12>}`;
