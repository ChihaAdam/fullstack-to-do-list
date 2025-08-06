export type userCredentials = {
  username: string;
  password: string;
};
export type status = "idle" | "loading" | "success" | "error";
export type Todo ={
  _id: string; // ObjectId as string
  title: string;
  description: string;
  completed: boolean;
  author: string; // ObjectId as string
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}