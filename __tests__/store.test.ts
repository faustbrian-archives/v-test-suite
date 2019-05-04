import { IValueStore } from "@faustbrian/common-value-store";
import { complianceTests } from "../src";

export class Store<T> implements IValueStore<T> {
	private readonly store: Set<T> = new Set<T>();

	public all(): T[] {
		return [...this.store.values()];
	}

	public put(value: T): boolean {
		this.store.add(value);

		return this.has(value);
	}

	public putMany(values: T[]): boolean[] {
		return values.map((value: T) => this.put(value));
	}

	public has(value: T): boolean {
		return this.store.has(value);
	}

	public hasMany(values: T[]): boolean[] {
		return values.map((value: T) => this.has(value));
	}

	public missing(value: T): boolean {
		return !this.has(value);
	}

	public missingMany(values: T[]): boolean[] {
		return values.map((value: T) => this.missing(value));
	}

	public forget(value: T): boolean {
		return this.store.delete(value);
	}

	public forgetMany(values: T[]): boolean[] {
		return values.map((value: T) => this.forget(value));
	}

	public flush(): boolean {
		this.store.clear();

		return this.count() === 0;
	}

	public count(): number {
		return this.store.size;
	}
}
complianceTests(new Store<number>(), [...Array(5).keys()]);
