export enum UserRoles {
  ADMIN = 1,
  EMPLOYEE = 2,
  MANAGER = 3,
  VIEWER = 4,
}

export const JWT_SECRET_TOKEN = 'this_should_not_be_in_source_control';

export interface EnvConfig {
  DATABASE_URL: string;
  DATABASE_NAME: string;
  JWT_SECRET_TOKEN: string;
  PORT: number;
}
