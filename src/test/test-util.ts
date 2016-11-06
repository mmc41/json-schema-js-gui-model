import { isArray, isObject  } from '../lib/type-utils';

/**
 * Return a copy of the object with all properties set to undefined removed.
 * Useful when comparing objects that are the same execpt for properties set to undefined.
 */
export function deeplyStripUndefined(source: any): any {
    if (source === null || source === undefined) {
      return source;
    } else if (isArray(source)) {
      return source.map((e: any) => deeplyStripUndefined(e));
    } else if (isObject(source)) {
        let copy = {};

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                let orgValue = source[key];
                if (orgValue !== undefined) {
                    copy[key] = deeplyStripUndefined(source[key]);
                }
            }
        }

        return copy;
    } else {
        return source;
    }
}

