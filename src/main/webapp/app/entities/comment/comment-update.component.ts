import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComment, Comment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { IEntry } from 'app/shared/model/entry.model';
import { EntryService } from 'app/entities/entry';

@Component({
  selector: 'jhi-comment-update',
  templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
  isSaving: boolean;

  entries: IEntry[];

  editForm = this.fb.group({
    id: [],
    comment: [null, [Validators.required, Validators.minLength(2)]],
    entry: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commentService: CommentService,
    protected entryService: EntryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ comment }) => {
      this.updateForm(comment);
    });
    this.entryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEntry[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEntry[]>) => response.body)
      )
      .subscribe((res: IEntry[]) => (this.entries = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(comment: IComment) {
    this.editForm.patchValue({
      id: comment.id,
      comment: comment.comment,
      entry: comment.entry
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const comment = this.createFromForm();
    if (comment.id !== undefined) {
      this.subscribeToSaveResponse(this.commentService.update(comment));
    } else {
      this.subscribeToSaveResponse(this.commentService.create(comment));
    }
  }

  private createFromForm(): IComment {
    return {
      ...new Comment(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      entry: this.editForm.get(['entry']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackEntryById(index: number, item: IEntry) {
    return item.id;
  }
}
