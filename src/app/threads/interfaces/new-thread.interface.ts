export interface NewThread {
  id: string;
  content: string;
  createdAt: Date;
  imageUrl: null | string;
  user: {
    username: string;
    avatar: string;
  };
}
