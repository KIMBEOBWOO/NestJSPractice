import { DynamicModule, Module, NotImplementedException } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommonConfigError } from './common.error';
import { DbConfig } from './db.interface';

@Module({})
export class DatabaseModule {
  public static getConnectionOptions(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
    const dbdata = config.get().db;
    console.log(config);
    let connectionOptions: TypeOrmModuleOptions;

    if (!dbdata) {
      throw new CommonConfigError('Database config is missing');
    }
    switch (dbdata.type) {
        case  'mysql':
          connectionOptions = this.getConnectionOptionsMysql(dbdata);
          break;
        // any other BD check  
          break;
          default:
            throw new NotImplementedException(`Database type '${dbdata.type}' not supported`);
      }
    return {
        ...connectionOptions,
        entities: dbconfig.entities,
        // synchronize: true,
        logging: true,
      };
  }
  private static getConnectionOptionsMysql(dbdata: ConfigDBData): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: dbdata.host,
      port: dbdata.port,
      username: dbdata.user,
      password: dbdata.pass,
      database: dbdata.name,
      charset: dbdata.charset,
      extra: {
        collate: dbdata.collate,
        dialect: dbdata.dialect,
      },
    };
  }
  
  public static forRoot(dbconfig: DbConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => DatabaseModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}