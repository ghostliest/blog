export type Roles = 'USER' | 'ADMIN';

export interface IJwtUser {
  id: number;
  email: string;
  role: Roles;
  iat: number;
  exp: number;
}
