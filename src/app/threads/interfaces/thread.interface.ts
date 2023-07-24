export class Thread {
  constructor(
    public id: string,
    public content: string,
    public createdAt: Date,
    public imageUrl: string | null,
    public user: {
      username: string;
      avatar: string;
    },
    public repliesCount: number = 0,
    public likesCount: number = 0,
    public userHasLiked: boolean = false,
  ) {}
}
