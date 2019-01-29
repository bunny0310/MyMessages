import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postsService: PostsService) {
  }
  posts: Post[] = [];
  private postsSub: Subscription;
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  deletePost(postId: string) {
    this.postsService.deletePost(postId);
    }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
