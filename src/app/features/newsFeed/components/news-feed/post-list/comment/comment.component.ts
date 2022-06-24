import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { News } from '../../news-feed.component';
import { NewsfeedService } from 'src/app/features/newsFeed/newsfeed.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent implements OnInit, AfterViewInit {
  // @Input() story?: News;
  story?: News;
  storyId?: string | null;
  avatarUrl = '../assets/antrashare.png';
  userInfo_userName?: string;
  pageData?: any;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private newsfeedService: NewsfeedService,
    private authService: AuthenticationService,
    private ar: ActivatedRoute,
    private dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.story = this.data.story;
    this.userInfo_userName = this.authService.getUserInfo().userName;
    this.pageData = this.story?.comment?.slice(0, 3);
    console.log(this.userInfo_userName);
    // this.story = this.newsfeedService.getStoryData();
    // console.log(this.ar);
    // this.ar.paramMap.subscribe((params) => {
    //   this.storyId = params.get('id');
    // });
  }

  ngAfterViewInit(): void {
    this.paginator!.page.pipe(
      tap(() => {
        this.loadPageData(
          this.story?.comment,
          this.paginator!.pageIndex,
          this.paginator!.pageSize
        );
        console.log(this.paginator!.pageIndex);
        console.log(this.paginator?.pageSize);
      })
    ).subscribe();
    console.log(this.paginator?.pageIndex);
    console.log(this.paginator?.pageSize);
    // this.loadPageData(
    //   this.story!.comment,
    //   this.paginator!.pageIndex,
    //   this.paginator!.pageSize
    // );
  }

  postComment(event: string) {
    const newComment = {
      publisherName: this.userInfo_userName!,
      publishedTime: new Date(),
      content: { text: event },
    };
    this.story?.comment?.push(newComment);
    this.newsfeedService
      .addComment(newComment, this.story?._id)
      .subscribe((res) => {
        console.log(res);
      });
  }

  onClose(): void {
    this.dialogRef.close('test comment close dialog');
  }

  loadPageData(comments: News['comment'], pageIndex: number, pageSize: number) {
    let start = pageIndex * pageSize;
    let end = start + pageSize;
    this.pageData = comments!.slice(start, end);
  }
}
