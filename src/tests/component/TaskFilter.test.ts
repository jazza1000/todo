/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import TaskFilter from '@/components/task/TaskFilter.vue';
import { expect, test, describe, it, assert } from 'vitest';
import {mount} from '@vue/test-utils';

//test example here
describe('TaskFilter', () => {
    test('TaskFilter emits expected message', async () => {
      
    //arrange
    const wrapper = mount(TaskFilter);
    const search = wrapper.get('[data-test="search"]');
    const apply = wrapper.get('[data-test="apply"]');
    

    //act
    await search.setValue("mysearch");
    await apply.trigger("click");
    const filterEvent= wrapper.emitted('filtered');

    //assert
    expect(wrapper.emitted()).toHaveProperty('filtered')
    expect(filterEvent[0]).toEqual(['mysearch'])
    
    })


})