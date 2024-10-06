import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FieldValueEntity } from './field-value.entity';

@Entity()
export class FieldEntity {
  @PrimaryGeneratedColumn()
  fieldId: number;

  @Column()
  accountId: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => FieldValueEntity, (fieldValue) => fieldValue.field)
  fieldValues: FieldValueEntity[];
}
