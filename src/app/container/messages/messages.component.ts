import { UserService } from 'src/app/service/user/user.service';
import { ChatService } from 'src/app/service/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private messages = [];
  private curUser: any;
  private userFriend: any;
  private enterMess = '';
  private contacts: any;
  private contact: any;
  constructor(private chatService: ChatService, private globSV: GlobalDataService, private userSv: UserService) { }

  ngOnInit() {
    this.chatService.initSocket();
    this.chatService.onMes().subscribe(r => {
      this.messages.push(r);
    });
    this.globSV.getCurrentUser().subscribe(r => {
      this.curUser = r;
    });
    this.getContact();
    this.getInformationFriend();
    this.getMess();
  }

  sendMess() {
    if (this.enterMess !== '' && this.contact) {
      const data = {
        userReceiptId: this.contact.userFriendId,
        message: this.enterMess,
        userId: this.curUser.id
      };
      this.messages.push(data);
      this.enterMess = '';
      this.chatService.sendMessage(data);
    }
  }

  getInformationFriend() {
    this.userSv.getByIdUser(12).subscribe(r => {
      this.userFriend = r;
    });
  }

  getContact() {
    this.userSv.getContact(this.curUser.id).subscribe(r => {
      this.contacts = r;
    });
  }
  chooseMes(contact) {
    this.contact = contact;
  }

  getMess() {
    // const filter = {
    //   where: {
    //     userReceiptId: this.contact.userFriendId,
    //     userId: this.curUser.id
    //   }
    // };
    this.userSv.getMesage({}).subscribe(r => {
      this.messages = r.rows;
    });
  }

}
