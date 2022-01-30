import { Module } from '@nestjs/common';
import { DBProviders } from '../../providers';

@Module({
  providers: [...Object.values(DBProviders)]
})
export class DBModule {}
