import {Routes} from '@angular/router';
import {ChatBotComponent} from '@admin-ui/comms/chat/chat-bot/chat-bot.component';
import {ChatListComponent} from '@admin-ui/comms/chat/chat-list/chat-list.component';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    component: ChatListComponent,
  },
  {
    path: 'chat',
    component: ChatBotComponent,
  },
];
