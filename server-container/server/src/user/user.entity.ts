import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { UserRoles } from 'lib/constants';
@Entity()
export class User {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  username!: string;

  @Column()
  emailAddress!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  roles: UserRoles[];
}
