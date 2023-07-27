export interface Reply {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    username: string;
    avatar: string;
  };
}
