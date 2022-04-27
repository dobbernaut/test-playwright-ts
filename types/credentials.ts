export interface Roles {
  [x: string]: Credentials;
}

export interface Credentials {
  username: string;
  password: string;
}
