import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { ExpencesModule } from './expences/expences.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import SettingService from './common/services/setting.service';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import Group from './group/entities/group.entity';
import Expences from './expences/entities/expences.entity';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [SettingService],
      useFactory: (settingService: SettingService) => ({
        store: new KeyvRedis(settingService.redis_url),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [SettingService],
      useFactory: (settingService: SettingService) => {
        return {
          type: 'postgres',
          host: settingService.database_host,
          port: settingService.database_port,
          database: settingService.database_name,
          username: settingService.database_user,
          password: settingService.database_password,
          entities: [Group, Expences],
          synchronize: settingService.environment === 'dev',
        };
      },
    }),
    GroupModule,
    ExpencesModule,
    CommonModule,
  ],
})
export class AppModule {}
