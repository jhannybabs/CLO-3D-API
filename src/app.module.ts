import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DesignsModule } from './modules/designs/designs.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuditModule } from './modules/audit/audit.module';
import { GarmentsModule } from './modules/garments/garments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/clo-3d',
    ),
    UsersModule,
    DesignsModule,
    OrdersModule,
    PaymentsModule,
    AuditModule,
    GarmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
