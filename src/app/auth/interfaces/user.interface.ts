export interface CurrentUser {
  accessToken: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}
