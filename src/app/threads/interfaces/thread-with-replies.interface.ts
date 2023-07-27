import { Reply } from 'src/app/replies/interfaces';
import { Thread } from './thread.interface';

export interface ThreadWithReplies extends Thread {
  replies: Reply[];
}
