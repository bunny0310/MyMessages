import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root'})
export class PostsService {
  constructor(private httpClient: HttpClient) {}
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPosts() {
    this.httpClient.get<{posts: Post[]}>('http://localhost:3000/api/posts').
    subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
      console.log(this.posts);
    });
  }
  getPost(id: string) {
    return {...this.posts.find(p => p._id === id)};
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(post: Post) {
    this.httpClient.post<{message: string, updated_id: string}>('http://localhost:3000/api/posts', post).
    subscribe(responseData => {
      console.log(responseData.updated_id);
      console.log(post._id);
      post._id = responseData.updated_id;
      console.log(post._id);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
  deletePost(postId: string) {
    this.httpClient.delete<{message: string}>('http://localhost:3000/api/posts/' + postId).
    subscribe(responseData => {
      this.getPosts();
    });
  }
}
