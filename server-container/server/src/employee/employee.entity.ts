import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
//Note that we are using ObjectId from Mongo, NOT TypeOrm

@Entity()
export class Employee {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  emailAddress!: string;
}

// export interface EmployeeBase {
//   _id: ObjectID;
//   firstName: string;
//   lastName: string;
//   emailAddress: string;
// }
