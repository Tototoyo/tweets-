
export enum OutputType {
  Single = 'single tweet',
  Thread = 'thread',
  Variations = 'multiple tweet variations',
}

export interface Generation {
    id: string;
    created_at: string;
    topic: string;
    output_type: OutputType;
    tweets: string[];
}
