import mysql from "mysql";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});
