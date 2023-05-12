// decorators
import { Module, forwardRef } from '@nestjs/common';

// modules
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';

// guards
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CorreioModule } from './correios/correio.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    StateModule,
    CityModule,
    CategoryModule,
    ProductModule,
    JwtModule,
    CartModule,
    CorreioModule,
    OrderModule,
    OrderProductModule,
    PaymentModule,
    PaymentStatusModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
