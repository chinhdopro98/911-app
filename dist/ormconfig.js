"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: (process.env.DB_PASSWORD).toString(),
    database: process.env.DB_NAME,
    logging: true,
    synchronize: true,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ["dist/src/migrations/*.js"],
});
//# sourceMappingURL=ormconfig.js.map