import { Reply } from 'src/app/replies/reply.interface';
import { Thread } from './thread.interface';

export interface ThreadWithReplies extends Thread {
  replies: Reply[];
}
