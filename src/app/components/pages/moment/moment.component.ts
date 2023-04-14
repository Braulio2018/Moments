import { MessagesService } from './../../../services/messages.service';
import { CommentService } from './../../../services/comment.service';
import { Comment } from './../../../Comment';
import { MomentService } from './../../../services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlDirective, FormGroupDirective } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';


import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit{
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  CommentForm!: FormGroup

  constructor (
    private momentService: MomentService,
    private route: ActivatedRoute,
    private CommentService: CommentService
    ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id)
    .subscribe((item) => (this.moment = item.data));

    this.CommentForm = new FormGroup({
      text: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
    });
  }

  get text() {
    return this.CommentForm.get('text')!;
  }

  get username() {
    return this.CommentForm.get('username')!;
  }

  async onSubmit(FormDirective: FormGroupDirective) {

    if(this.CommentForm.invalid){
      return;
    }

    const data: Comment = this.CommentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.CommentService
     .createComment(data)
     .subscribe((comment) => this.moment!.comments!.push(comment.data));

    // this.messagesService.add('Comentario adicionado');

    this.CommentForm.reset();

    FormDirective.resetForm();
  }

}
