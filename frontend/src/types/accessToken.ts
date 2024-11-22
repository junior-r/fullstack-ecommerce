export type AccessToken = {
  exp: number;
  iat: number;
  jti: string;
  permissions: string[];
  token_type: string;
  user_id: number;
  username: string;
};
