import { IEntry } from 'app/shared/model/entry.model';

export interface IComment {
  id?: number;
  comment?: string;
  entry?: IEntry;
}

export class Comment implements IComment {
  constructor(public id?: number, public comment?: string, public entry?: IEntry) {}
}
