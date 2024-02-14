// TYPESCRIPT

import { consoleLog } from "./utils";
import * as mysql from 'mysql2';

type DatabaseConfig = {
	host: string;
	user: string;
	password: string;
	database: string;
}

class Database {
	private host: string;
	private user: string;
	private password: string;
	private dbName: string;

	constructor(databaseConfig: DatabaseConfig) {
		this.host = databaseConfig.host;
		this.user = databaseConfig.user;
		this.password = databaseConfig.password;
		this.dbName = databaseConfig.database;
	}
}

class MySqlDb implements QueryBuilder {
	public databaseConfig: DatabaseConfig;
	public database: Database;
	private connexion: mysql.Pool;

	private querySelect: string = '';
	private queryWhere: string = '';
	private queryOrder: string = '';
	private queryLimit: string = '';

	constructor(databaseConfig: DatabaseConfig) {
		this.databaseConfig = databaseConfig;
		this.database = new Database(databaseConfig);
		this.connexion = mysql.createPool(databaseConfig);
	}

	public select = (table: string, columns: string[]) => {
		consoleLog('Sélection de données');
		this.querySelect = `SELECT ${columns.join(', ')} FROM ${table}`;
		return this;
	}

	public whereEqual = (column: string, value: string) => {
		consoleLog('Ajout d\'une condition');
		this.queryWhere = `WHERE ${column} = ${value}`;
		return this;
	}

	public orderBY = (column: string, order: string) => {
		consoleLog('Ajout d\'un ordre');
		this.queryOrder = `ORDER BY ${column} ${order}`;
		return this;
	}

	public limit = (value: number) => {
		consoleLog('Ajout d\'une limite');
		this.queryLimit = `LIMIT ${value}`;
		return this;
	}

	public execute = () => {
		consoleLog('Exécution de la requête');
		const query = `${this.querySelect} ${this.queryWhere} ${this.queryOrder} ${this.queryLimit}`;
		console.log(query);
		this.connexion.query(query, (err, results, fields) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(results);
		});
	}
}

interface QueryBuilder {
	select(table: string, columns: string[]): void;
	whereEqual(column: string, value: string): void;
	orderBY(column: string, order: string): void;
	limit(value: number): void;
	execute(): void;
}


const databaseConfig: DatabaseConfig = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'db_trail_horizon'
}

const db = new MySqlDb(databaseConfig);

db
	.select('races', ['id', 'name'])
	.whereEqual('id', '1')
	
db.execute();

/*
	QUESTION 2 :

	Pour améliorer le code selon le type de base de données utilisé par les utilisateurs,
	nous devons utiliser le design pattern "Strategy".

	Nous implémenterions une nouvelle classe par type de base de données (MySqlDb, PostgresDb, etc.)
	avec toutes les méthodes qui leur correspondent.	
	Toutes ces classes doivent être implémenté de l'interface QueryBuilder.

*/