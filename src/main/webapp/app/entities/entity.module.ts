import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule'
      },
      {
        path: 'entry',
        loadChildren: './entry/entry.module#EntryModule'
      },
      {
        path: 'tag',
        loadChildren: './tag/tag.module#TagModule'
      },
      {
        path: 'comment',
        loadChildren: './comment/comment.module#CommentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
