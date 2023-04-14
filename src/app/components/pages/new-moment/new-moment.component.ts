import { MessagesService } from './../../../services/messages.service';
import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../Moment';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private router: Router,
    private messagesService: MessagesService
    ) { }

   ngOnInit(): void {}

   async createHandler(moment: Moment){
   const formData = new FormData();

   formData.append('title', moment.title);
   formData.append('description', moment.description);

   if (moment.image) {
    formData.append('image', moment.image);
   }

    await this.momentService.createMoment(formData).subscribe();

    // this.messagesService.add('Momento adicionado com sucesso!');

   //redirect
  this.router.navigate(['/']);

  }

}
