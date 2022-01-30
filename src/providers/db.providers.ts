import * as mongoose from 'mongoose';
import { Provider } from './provider.enum';

export const DBProviders = {
  [Provider.MONGODB_CONNECTION]: {
    provide: Provider.MONGODB_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_URI ?? `mongodb://localhost:27017/${process.env.MONGO_DB_NAME ?? 'testXPTO'}`)
  }
}
  