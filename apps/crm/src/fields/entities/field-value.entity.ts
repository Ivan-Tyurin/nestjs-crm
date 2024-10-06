import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FieldEntity } from './field.entity';

@Entity()
export class FieldValueEntity {
  @PrimaryGeneratedColumn()
  fieldValueId: number;

  @Column()
  accountId: number;

  @Column()
  value: string;

  @OneToMany(() => FieldEntity, (field) => field.fieldValues)
  field: FieldEntity;
}
