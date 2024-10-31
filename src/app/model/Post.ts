import { PostImage } from "./PostImage";
import { User } from "./User";

export interface Post {
  postID: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
}
