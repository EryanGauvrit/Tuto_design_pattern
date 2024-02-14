// TYPESCRIPT

import { consoleLog } from "./utils";

class Product {
	public name: string;
	public price: number;

	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}
}

class Cart {
	public products: Product[] = [];

	public addProduct(product: Product): void {
		this.products.push(product);
	}

	public getTotalPrice(): number {
		let totalPrice = 0;
		this.products.forEach((product) => {
			totalPrice += product.price;
		});
		return totalPrice;
	}
}

class CountryTaxeAdapter implements Cart {
	private cart: Cart;
	public country: string;
	public taxes: number;
	public products: Product[];

	constructor(cart: Cart, country: string, taxes: number) {
		this.cart = cart;
		this.country = country;
		this.taxes = taxes;
		this.products = cart.products;
	}

	public addProduct(product: Product): void {
		this.cart.addProduct(product);
	}

	public getTotalPrice(): number {
		const totalPrice = this.cart.getTotalPrice();
		return totalPrice + (totalPrice * this.taxes);
	}
}

class TeamPrice implements Cart {
	private cart: Cart;
	private discount = 0.8;
	public products: Product[];

	constructor(cart: Cart) {
		this.cart = cart;
		this.products = cart.products;
	}

	public addProduct(product: Product): void {
		this.cart.addProduct(product);
	}

	public getTotalPrice(): number {
		const totalPrice = this.cart.getTotalPrice();
		return totalPrice * this.discount;
	}
}

const product1 = new Product('product1', 100);
const product2 = new Product('product2', 200);
const cart = new Cart();

cart.addProduct(product1);
cart.addProduct(product2);

consoleLog('Total price without taxes: ' + cart.getTotalPrice() + '€');

const frenchCart = new CountryTaxeAdapter(cart, 'France', 0.2);
consoleLog('Total price with taxes: ' + frenchCart.getTotalPrice() + '€');

const teamCart = new TeamPrice(cart);
consoleLog('Total price for our team: ' + teamCart.getTotalPrice() + '€');

