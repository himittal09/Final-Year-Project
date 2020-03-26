"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
exports.pluckAndReduce = function (collection, factor) {
    if (!collection.length) {
        return 0;
    }
    if (typeof (collection[0][factor]) != 'number') {
        throw new Error("The type must be a number!");
    }
    var pluckedArray = collection.map(function (collectionItem) { return collectionItem[factor]; });
    return lodash_1.reduce(pluckedArray, function (total, n) { return total + n; }) / pluckedArray.length;
};
exports.specialMinifier = function (objArray, valueArray) {
    var obj;
    valueArray.forEach(function (valueKey) {
        obj[valueKey] = exports.pluckAndReduce(objArray, valueKey);
    });
    return obj;
};
exports.specialPAR = function (collection, baseOfReduction, valueArray) {
    var finalObj = {};
    var arrangedObject = lodash_1.groupBy(collection, function (er) { return er[baseOfReduction]; });
    Object.keys(arrangedObject).forEach(function (questionArray) {
        finalObj[questionArray] = exports.specialMinifier(arrangedObject[questionArray], valueArray);
    });
    return finalObj;
};
exports.hasID = function (arrayTwoId, arrayOne, arrayOneKey) {
    arrayOne.forEach(function (element, index) {
        if (Object.is(element[arrayOneKey], arrayTwoId)) {
            return index;
        }
    });
    return -1;
};
exports.mergeArrays = function (arrayOne, arrayOneKey, arrayTwo, arrayTwoKey) {
    arrayTwo.forEach(function (element) {
        var idIndex = exports.hasID(element[arrayTwoKey], arrayOne, arrayOneKey);
        if (idIndex >= 0) {
            Object.assign(arrayOne[idIndex], element);
        }
        else {
            arrayOne.push(element);
        }
    });
    return arrayOne;
};
