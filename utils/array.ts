import { IFeatureDataNode } from '@/types';
import _ from 'lodash';

// START FOR TREE
export function getFeatureTree(
	data: any[],
	level: number,
	root: number,
): IFeatureDataNode[] {
	let result: any[] = [];
	const dataSorted = data.sort((a, b) => a.sort_order - b.sort_order);
	for (let i = 0; i < dataSorted.length; i++) {
		if (dataSorted[i].level == level && dataSorted[i].parent_id == root) {
			let row = Object.assign({}, dataSorted[i]);
			let lowerLevel: any[] = getFeatureTree(
				dataSorted,
				level + 1,
				row.function_id,
			);
			let levelResult = {
				title: row.function_name,
				key: row.function_id,
				parent_id: row.parent_id,
				url: row.url,
				level: row.level,
				children: lowerLevel,
				sort_order: row.sort_order,
			};
			result.push(levelResult);
		}
	}
	return result;
}

export function getNodeTree(dataTree: any[], id: number | string): any {
	if (dataTree.length === 0) return null;

	let result;
	for (let i = 0; i < dataTree.length; i++) {
		if (dataTree[i].key === id) {
			result = dataTree[i];
			break;
		}
		result = getNodeTree(dataTree[i].children, id);
		if (result !== null) break;
	}

	return result;
}

export const checkIfNotEnoughLeafs = (
	tree: any[] = [],
	functions: number[] = [],
) => {
	const cloneFunctions = JSON.parse(JSON.stringify(functions));

	if (!tree || tree.length === 0) {
		return false; // Return 1 to indicate one leaf node.
	}

	const parentToRemove: string[] = [];

	for (let i = 0; i < tree.length; i++) {
		const children = tree[i].children;
		if (children) {
			const c = children.find(
				(child: any) => !cloneFunctions.includes(child.key),
			);
			checkIfNotEnoughLeafs(children, cloneFunctions);

			if (c) {
				parentToRemove.push(tree[i].key);
			}
		}
	}

	return parentToRemove;
};

export const filterNot = (
	origin: any[] = [],
	filter: any[] = [],
	keyFilter: string | number,
) => {
	let result = [];
	result = origin.filter((element) => !filter.includes(element[keyFilter]));
	return result;
};

export const flattenTree = (tree: any = []) => {
	const stack = [...tree];
	const result = [];

	while (stack.length > 0) {
		const node = stack.pop();
		// Add the current node's value to the result
		const { children, ...values } = node;
		result.push({ ...values });

		// Add children to the stack in reverse order
		for (let i = node.children.length - 1; i >= 0; i--) {
			stack.push(node.children[i]);
		}
	}

	return result;
};

// END FOR TREE

export function removeEmptyObject(obj: any) {
	const newObj: any = {};
	Object.entries(obj).forEach(([k, v]) => {
		if (v === Object(v)) {
			newObj[k] = removeEmptyObject(v);
		} else if (v != null) {
			newObj[k] = obj[k];
		}
	});
	return newObj;
}

export const compareNumbers = (a: any, b: any, key: string) => {
	if (!key) return a - b;
	return a[key] || 0 - b[key] || 0;
};

export const compareStrings = (a: any, b: any, key: string) => {
	const nameA = (key ? a[key] : a)?.toUpperCase() || ''; // ignore upper and lowercase
	const nameB = (key ? b[key] : b)?.toUpperCase() || ''; // ignore upper and lowercase
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// names must be equal
	return 0;
};

export const compareDates = (a: any, b: any, key: string) => {
	const nameA = new Date(key ? a[key] : a).getTime();
	const nameB = new Date(key ? b[key] : b).getTime();

	if (nameA < nameB) return -1;
	if (nameA > nameB) return 1;

	return 0;
};

export function convertToString(o: any) {
	Object.keys(o).forEach((k) => {
		if (o[k] && typeof o[k] === 'object') {
			return convertToString(o[k]);
		}

		if (typeof o[k] === 'number') o[k] = '' + o[k];
		else if (!o[k]) o[k] = '';
	});

	return o;
}

export const getUpdatedArray = (
	originalArray: any[],
	updatedArray: any[],
	unionKey: string,
) => {
	// get difference between originalArray and updatedArray
	const difference = _.differenceBy(originalArray, updatedArray, unionKey);
	// get intersection between originalArray and updatedArray
	const intersection = _.intersectionBy(originalArray, updatedArray, unionKey);
	// get difference between updatedArray and originalArray
	const difference2 = _.differenceBy(updatedArray, originalArray, unionKey);

	// add status: 'remove' for each element in difference
	const result = difference.map((element) => {
		return { ...element, status: '3' };
	});

	// add status: 'create' for each element in difference2
	difference2.forEach((element) => {
		result.push({ ...element, status: '1' });
	});

	// find each element in intersection and updatedArray
	// if element is not updated, add status: 'update'
	intersection.forEach((element) => {
		const index = _.findIndex(updatedArray, [unionKey, element[unionKey]]);
		if (!_.isEqual(element, updatedArray[index])) {
			result.push({ ...updatedArray[index], status: '2' });
		}
	});

	// return result
	return result;
};
