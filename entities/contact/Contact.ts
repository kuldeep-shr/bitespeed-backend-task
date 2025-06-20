import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DateTimeEntity } from "../base/timestamp";

export type LinkPrecedence = "primary" | "secondary";

@Entity({ name: "contacts" })
export class Contact extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: true })
  phoneNumber!: string | null;

  @Column({ type: "varchar", nullable: true })
  email!: string | null;

  // 💡 Change: use 'varchar' instead of native enum
  @Column({ type: "varchar", default: "primary" })
  linkPrecedence!: "primary" | "secondary";

  @Column({ type: "int", nullable: true })
  linkedId!: number | null;
}
