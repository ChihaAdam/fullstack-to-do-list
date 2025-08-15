export type userCredentials = {
  username: string;
  password: string;
};
export type status = "idle" | "loading" | "success" | "error";
export type Todo ={
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export type TodoRaw={
  title:string;
  description:string
}
export type userInfo = {
  username: string
}