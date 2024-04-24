type ObjectWithKey<Key extends string, Value> = { [key in Key]: Value }

export const not = <F extends (...args: any[]) => boolean>(f: F) => ((...args) => !f(...args)) as F;

export const cmpByKey = <K extends string>(key: K) =>
    (object1: ObjectWithKey<K, number | undefined>, object2: ObjectWithKey<K, number | undefined>) => {
    return object1[key]! - object2[key]!;
}
