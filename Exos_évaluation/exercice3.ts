// TYPESCRIPT

import { consoleLog } from "./utils";
import * as fs from 'fs';

interface Config {
	DEBUG: boolean;
}

class AppConfig {
	public config: Config;

	constructor() {
		this.config = this.getConfig();
	}
	
	private getConfig = (): Config => {
		const file = fs.readFileSync('./config.json', 'utf8');
		this.config = JSON.parse(file);
		return this.config;
	}

	public debug = (): boolean => {
		return this.config.DEBUG;
	}

	public switchDebug = (): void => {
		this.config.DEBUG = !this.config.DEBUG;
	}

	public log = (message: string): void => {
		if (this.debug()) {
			consoleLog(message);
		}else {
			consoleLog('[ERROR] : Debug mode is off');
		}
	}
}

const appConfig = new AppConfig();

appConfig.log('Hello World');
consoleLog('Debug: ' + appConfig.debug());

appConfig.switchDebug();

appConfig.log('Hello World');
consoleLog('Debug: ' + appConfig.debug());
