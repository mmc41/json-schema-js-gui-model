export function isString(obj: any) {
   return (typeof obj) === 'string';
}

export function isBoolean(obj: any) {
   return (typeof obj) === 'boolean';
}

export function isNumber(obj: any) {
   return (typeof obj) === 'number';
}

export function isIntegerNumber(obj: any) {
   return (typeof obj) === 'number' && Number.isInteger(obj);
}

export function isObject(obj: any) {
   return obj != null && (typeof obj) === 'object' && !(obj instanceof Array);
}

export function isArray(obj: any) {
   return (obj instanceof Array);
}
