// TYPESCRIPT

import { consoleLog } from "./utils";

const sendNotification = (user: User, message: string): void => {
	consoleLog(`[NOTIFICATION] : ${user} - ${message}`);
}

abstract class Emitter {

	private observers: Observer[] = [];

	attachObserver(observer: Observer): void {
		this.observers.includes(observer) ? null : this.observers.push(observer);
	};
	notify(message: string): void {
		this.observers.forEach((observer) => observer.update(this, message));
	};
}

class User {
	public username: string;

	constructor(username: string) {
		this.username = username;
	}

}

class Product {
	public name: string;
	public price: number;
	private stock: number;
	
	private observers: UserObserver[] = [];

	constructor(name: string, price: number, stock: number) {
		this.name = name;
		this.price = price;
		this.stock = stock;
	}

	public attachObserver(observer: UserObserver): void {
		this.observers.includes(observer) ? null : this.observers.push(observer);
	}

	public emitUpdate(message: string): void {
		this.observers.forEach((observer) => observer.update());
	}

	public addStock(quantity: number): void {
		this.stock += quantity;
	}

	public removeStock(quantity: number): void {
		this.stock -= quantity;
	}
}

abstract class Observer {
	abstract update(product: Product, message: string): void;
}


const user1 = new User('user1');
const user2 = new User('user2');
const user3 = new User('user3');

const product1 = new Product('product1', 10, 100);
