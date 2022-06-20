import * as mongoose from 'mongoose';
import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

export class CustomSchemaFactory {
  static createForClass<TClass = any>(target: Type<TClass>): mongoose.Schema<TClass> {
    const schema = SchemaFactory.createForClass(target);

    schema.set('toJSON', {
      transform: (_, converted) => {
        if (converted.hasOwnProperty('_id')) {
          converted.id = converted._id.toString();
          delete converted._id;
        }

        if (converted.hasOwnProperty('__v')) {
          delete converted.__v;
        }

        return converted;
      },
    });

    return schema;
  }
}
