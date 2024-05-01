import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module'; 

@Module({

  imports: [
    MongooseModule.forRoot('mongodb+srv://thanapat:K6UyBWMRuP5ZvZ7p@thanapat.q6w4ttk.mongodb.net/?retryWrites=true&w=majority'),
    AuthModule, 
  ],
})
export class AppModule {}





