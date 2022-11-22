import { InterpreterLanguage } from 'src/interpreterlanguage/entities/interpreterlanguage.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('language')
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @OneToMany(
    () => InterpreterLanguage,
    (interpreterLanguage) => interpreterLanguage.language,
  )
  interpreterLanguage!: InterpreterLanguage[];
}
