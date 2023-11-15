/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import TaskFilter from '@/components/task/TaskFilter.vue';
import { expect, test, describe } from 'vitest';
import {mount} from '@vue/test-utils';
import { stringToDate, dateToISOString } from '@/mappers/date'

//test example here
describe('TaskFilter', () => {
    test('TaskFilter emits event event with correct parameters when Apply Date Filter is checked', async () => {
        //arrange
        const wrapper = mount(TaskFilter);

        const searchInput = wrapper.get('[data-test="search"]');
        const searchValue = "searchValue";
        await searchInput.setValue(searchValue);

        const dateFromInput = wrapper.get('[data-test="dateFrom"]');
        const dateFromValue = dateToISOString(new Date(1000));
        await dateFromInput.setValue(dateFromValue);

        const dateToInput = wrapper.get('[data-test="dateTo"]');
        const dateToValue = dateToISOString(new Date(1001));
        await dateToInput.setValue(dateToValue);

        const dateFilter = wrapper.get('[data-test="dateFilter"]');
        await dateFilter.setChecked()

        const applyButton = wrapper.get('[data-test="apply"]');

        const expectedDateFrom = stringToDate(dateFromValue)
        const expectedDateTo = stringToDate(dateToValue)

        //act
        await applyButton.trigger("click");

        //assert
        const filterEvent= wrapper.emitted('filtered');

        expect(wrapper.emitted()).toHaveProperty('filtered')
        expect(filterEvent).not.toBe(undefined)
        expect(filterEvent[0]).toEqual([searchValue, expectedDateFrom, expectedDateTo])
    })

    test('TaskFilter emits event event with correct parameters when Apply Date Filter is not checked', async () => {
        //arrange
        const wrapper = mount(TaskFilter);

        const searchInput = wrapper.get('[data-test="search"]');
        const searchValue = "searchValue";
        await searchInput.setValue(searchValue);

        const dateFromInput = wrapper.get('[data-test="dateFrom"]');
        const dateFromValue = dateToISOString(new Date(1000));
        await dateFromInput.setValue(dateFromValue);

        const dateToInput = wrapper.get('[data-test="dateTo"]');
        const dateToValue = dateToISOString(new Date(1001));
        await dateToInput.setValue(dateToValue);

        const dateFilter = wrapper.get('[data-test="dateFilter"]');
        await dateFilter.setChecked(false)

        const applyButton = wrapper.get('[data-test="apply"]');

        //act
        await applyButton.trigger("click");

        //assert
        const filterEvent= wrapper.emitted('filtered');

        expect(wrapper.emitted()).toHaveProperty('filtered')
        expect(filterEvent).not.toBe(undefined)
        expect(filterEvent[0]).toEqual([searchValue, undefined, undefined])
    })
})