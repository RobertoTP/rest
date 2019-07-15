import { Moment } from 'moment';
import { IBlog } from 'app/shared/model/blog.model';
import { ITag } from 'app/shared/model/tag.model';
import { IComment } from './comment.model';

export interface IEntry {
  id?: number;
  title?: string;
  content?: any;
  date?: Moment;
  blog?: IBlog;
  tags?: ITag[];
  comments?: IComment[];
}

export class Entry implements IEntry {
  constructor(
    public id?: number,
    public title?: string,
    public content?: any,
    public date?: Moment,
    public blog?: IBlog,
    public tags?: ITag[],
    public comments?: IComment[]
  ) {}
}
