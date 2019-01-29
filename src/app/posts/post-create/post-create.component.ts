import { Component, OnInit} from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode: String = 'create';
  private id: string;
  private post: Post;
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.id = paramMap.get('postId');
        this.post = this.postsService.getPost(this.id);
      } else {
        this.mode = 'create';
        this.id = null;
      }
      });
  }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      _id: null,
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(post);
    form.resetForm();
  }
}
