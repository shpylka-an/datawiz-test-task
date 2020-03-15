export type ValidationError = {
  msg: string;
  param: "email" | "password";
  location: string;
};

export type Employee = {
  key: number,
  name: string,
  age: number,
  address: string
}
