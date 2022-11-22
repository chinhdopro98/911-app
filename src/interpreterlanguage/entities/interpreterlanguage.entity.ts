import { Interpreter } from 'src/interpreters/entities/interpreter.entity';
import { Language } from 'src/languages/entities/language.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InterpreterLanguage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  interpreterUserId!: string;

  @Column()
  languageId!: number;

  @ManyToOne(
    (type) => Interpreter,
    (interpreter) => interpreter.interpreterLanguage,
  )
  @JoinColumn({ name: 'interpreterUserId', referencedColumnName: 'userId' })
  interpreter!: Interpreter;

  @ManyToOne((type) => Language, (language) => language.interpreterLanguage)
  language!: Language;
}
