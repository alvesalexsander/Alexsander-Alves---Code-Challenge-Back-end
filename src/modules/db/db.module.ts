import { Module } from '@nestjs/common';
import { DBProviders } from '../../providers';

@Module({
  providers: [DBProviders.MONGODB_CONNECTION]
})
export class DBModule {}
