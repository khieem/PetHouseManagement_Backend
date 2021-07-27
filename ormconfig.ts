import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
	type: 'sqlite',
	database: 'db',
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: true,
	migrations: ['dist/src/db/migrations/*{.js,.ts}'],
	cli: {
		migrationsDir: 'src/db/migrations',
	},
};
export default config;
