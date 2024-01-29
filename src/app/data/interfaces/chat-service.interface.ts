import {IUser} from '@models/accounts.model';
import {IMessage} from '@models/common.model';

export interface IChatService {
  login(username: string, password: string): any;

  logout(user: IUser): any;

  joinChatRoom(roomId: number, user: IUser): any;

  sendMessage(message: IMessage, roomId: number, user: IUser): any;

  sendPrivateMessage(message: IMessage, receiverId: number, user: IUser): any;
}
