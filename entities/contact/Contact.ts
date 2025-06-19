import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DateTimeEntity } from "../base/timestamp";

@Entity({ name: "contacts" })
export class Contact extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: true })
  phoneNumber!: string | null;

  @Column({ type: "varchar", nullable: true })
  email!: string | null;

  @Column({ type: "varchar", default: "primary" })
  linkPrecedence!: "primary" | "secondary";

  @Column({ type: "int", nullable: true })
  linkedId!: number | null;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: "linkedId" })
  linkedContact!: Contact;
}
