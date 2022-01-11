import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    applicationName: 'Coffee',
    synchronize: true, // should be disabled on production - sync db with every restart
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
