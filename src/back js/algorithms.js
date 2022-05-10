"use strict"

const searching = (arr, value, elementName) => {
    let inf = 0, sup = arr.length - 1; 

    while (inf <= sup)
    {
        let mid = Math.floor((inf + sup) / 2);

        if (arr[mid][elementName] == value)
        {
            return arr[mid];
        }
        else if (arr[mid][elementName] < value)
        {
            inf = mid + 1;
        } 
        else { 
            sup = mid - 1;
        }
    }

    return false;
}

const algorithms = {};

algorithms.searching = searching;

module.exports =  algorithms;
