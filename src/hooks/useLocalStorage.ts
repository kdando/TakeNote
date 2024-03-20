import { useEffect, useState } from "react";


export function useLocalStorage<T> (key: string, initialValue: T | (() => T)) {
    //CHECK IF VALUE EXISTS
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    //UPDATE IT WHEN IT CHANGES
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    //return an array, the type of the first item in array will be our type T, the second value will be of whatever type setValue is. "as" is a way of casting the data types
    return [value, setValue] as [T, typeof setValue]

}