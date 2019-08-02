import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';
import {ConversationService} from '../services/conversation.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  frinedId = '';
  friend: User;
  user: User;
  conversationId: string;
  textMessage: string;
  messages: Array<any> = [];

  shake: Boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private conversationService: ConversationService,
              private authenticationService: AuthenticationService) {
    this.frinedId = this.activatedRoute.snapshot.params['uid'];

    console.log(this.friend);
    this.authenticationService.getStatus().subscribe((data) => {
      this.userService.getUserById(data.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUserById(this.frinedId).valueChanges().subscribe((data: User) => {
            this.friend = data;
            const ids = [this.user.uid, this.frinedId].sort();
            this.conversationId = ids.join('|');
            this.getMessagges();
          },
          (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });

  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      reciver: this.frinedId,
      type: 'text'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    }, (error) => {
    });
  }

  getMessagges() {
    this.conversationService.getConversation(this.conversationId).valueChanges().subscribe((messages) => {
      this.messages = messages;
      this.messages.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type === 'text') {
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type === 'zumbido') {
            this.doZumbido();
          }
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  getNickById(id) {
    if (this.friend.uid === id) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }
  sendZumbido() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      reciver: this.frinedId,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message).then(() => {}, (error) => {  });
    this.doZumbido();
  }
  doZumbido() {
    let audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    setTimeout(() => {
      this.shake = false;
    }, 1000);
  }
}
