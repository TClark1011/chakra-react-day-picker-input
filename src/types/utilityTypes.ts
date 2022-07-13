export type Merge<Source, Update> = Omit<Source, keyof Update> & Update;
