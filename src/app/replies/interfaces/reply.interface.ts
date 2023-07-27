import { NewReply } from './new-reply.interface';

export interface Reply extends NewReply {
  user: {
    username: string;
    avatar: string;
  };
}
