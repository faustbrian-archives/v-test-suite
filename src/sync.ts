import { IValueStoreSync } from "@faustbrian/common-value-store";
// tslint:disable-next-line: no-import-side-effect
import "jest-extended";

export const complianceTestsSync = <V>(store: IValueStoreSync<V>, items: V[]): void => {
	const itemsBool: boolean[] = new Array(5).fill(true);

	beforeEach(() => store.flush());

	it("should get all of the items in the store", () => {
		store.putMany(items);

		expect(store.all()).toEqual(items);
	});

	it("should put an item into the store", () => {
		expect(store.put(items[0])).toBeTrue();
	});

	it("should put many items into the store", () => {
		expect(store.putMany(items)).toEqual(itemsBool);
	});

	it("should be missing all items from the store", () => {
		for (const item of items) {
			expect(store.missing(item)).toBeTrue();
		}
	});

	it("should remove an item from the store", () => {
		expect(store.put(items[0])).toBeTrue();
		expect(store.forget(items[0])).toBeTrue();
	});

	it("should remove many items from the store", () => {
		expect(store.putMany(items)).toEqual(itemsBool);
		expect(store.forgetMany(items)).toEqual(itemsBool);
	});

	it("should remove all items from the store", () => {
		expect(store.putMany(items)).toEqual(itemsBool);
		expect(store.flush()).toBeTrue();
	});
};
