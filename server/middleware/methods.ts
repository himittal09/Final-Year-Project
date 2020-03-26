import { reduce, groupBy } from 'lodash';

export const pluckAndReduce = function <T> (collection: T[], factor: keyof T): number {

    if (!collection.length)
    {
        return 0;
    }

    if (typeof(collection[0][factor]) != 'number')
    {
        throw new Error("The type must be a number!");
    }

    const pluckedArray: number[] = collection.map<number>((collectionItem: T) => collectionItem[factor] as unknown as number);
    return reduce(pluckedArray, (total: number, n: number) => total + n) / pluckedArray.length;
};

export const specialMinifier = function <T> (objArray: T[], valueArray: (keyof T)[]): any {
    let obj: any;
    valueArray.forEach((valueKey: keyof T) => {
        obj[valueKey] = pluckAndReduce(objArray, valueKey) as unknown;
    });
    return obj;
};

export const specialPAR = function <T> (collection: T[], baseOfReduction: keyof T, valueArray: (keyof T)[]): any {
    
    type Dictionary<T> = { [ index: string ]: T[] };
    
    let finalObj = {};
    let arrangedObject: Dictionary<T> = groupBy(collection, er => er[baseOfReduction]);
    
    Object.keys(arrangedObject).forEach((questionArray: string) => {
        finalObj[questionArray] = specialMinifier(arrangedObject[questionArray], valueArray);
    });

    return finalObj;
};

export const hasID = function <T> (arrayTwoId: T[keyof T], arrayOne: T[], arrayOneKey: keyof T): number {
    arrayOne.forEach((element: T, index: number) => {
        if (Object.is(element[arrayOneKey], arrayTwoId))
        {
            return index;
        }
    });
    return -1;
};

export const mergeArrays = function <T> (arrayOne: T[], arrayOneKey: keyof T, arrayTwo: T[], arrayTwoKey: keyof T): T[] {
    arrayTwo.forEach((element: T) => {
        let idIndex: number = hasID(element[arrayTwoKey], arrayOne, arrayOneKey);
        if (idIndex >= 0)
        {
            Object.assign(arrayOne[idIndex], element);
        }
        else
        {
            arrayOne.push(element);
        }
    });
    return arrayOne;
}
