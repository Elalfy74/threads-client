export interface UserDto {
  accessToken: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}
