import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldValueEntity } from './entities/field-value.entity';
import { FieldEntity } from './entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldEntity, FieldValueEntity])],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class FieldsModule {}
