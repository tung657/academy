export function getFeatureTree(
	data: any[],
	level: number,
	root: number,
): any[] {
	let result: any[] = [];
	for (let i = 0; i < data.length; i++) {
		if (data[i].level == level && data[i].parent_id == root) {
			let row = Object.assign({}, data[i]);
			let lowerLevel: any[] = getFeatureTree(data, level + 1, row.function_id);
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
	});

	return o;
}
