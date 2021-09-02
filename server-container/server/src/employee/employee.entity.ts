import { Entity, Column, ObjectIdColumn } from 'typeorm';
//Note that we are using ObjectId from Mongo, NOT TypeOrm
import { ObjectId } from 'mongodb';

@Entity()
export class Employee {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  emailAddress: string;
}
