import { Role } from 'src/common/interfaces/common.interface';
import { InterpreterLanguage } from 'src/interpreterlanguage/entities/interpreterlanguage.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Interpreter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',
    enum: Role,
    default: Role.INTERPRETER,
  })
  role: Role;

  @Column({
    nullable: true,
  })
  languages!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  rating!: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isVerified: boolean;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @OneToOne((type) => User, (user) => user.interpreter)
  @JoinColumn({
    name: 'userId',
  })
  user!: User;

  @OneToMany(
    () => InterpreterLanguage,
    (interpreterLanguage) => interpreterLanguage.language,
  )
  interpreterLanguage!: InterpreterLanguage[];
}
