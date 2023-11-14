import { dateToISOString, stringToDate } from "@/mappers/date";
import { expect, test } from 'vitest';

    test('date string to a date returns date', ()=>{
        expect (stringToDate("11/04/2023")).toStrictEqual(new Date("11/04/2023"));
    })

    test('empty string to a date returns null', ()=>{
        expect (stringToDate("")).toStrictEqual(null);
    })

    test('date string to dateToISOString retrns string version of date',()=>{
        expect (dateToISOString(new Date("05 October 2011 14:48 UTC"))).toBe('2011-10-05T14:48')
    })

    test('null to dateToISOString retrns empty string',()=>{
        expect (dateToISOString(null)).toBe("")
    })