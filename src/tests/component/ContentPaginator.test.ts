import ContentPaginator from '@/components/ContentPaginator.vue';
import { expect, test, describe, it, assert } from 'vitest';
import {mount} from '@vue/test-utils';
import { usePlugins } from '../utils/plugins/plugins';

//test example here
describe('ContentPaginator', () => {
    it("emits event with correct params when first page button clicked", async () => {
        //arrange
        const page = 6;
        const pageSize = 5;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: 0
            }
        })
        const firstPageButton = wrapper.getElement("firstPage")

        const expectedPage = 1

        //act
        await firstPageButton.trigger("click");

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent![0]).toEqual([expectedPage, pageSize])
    }) 

    it("emits event with correct params when prev page button clicked", async () => {
        //arrange
        const page = 3;
        const pageSize = 5;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: 0
            }
        })
        const prevPageButton = wrapper.getElement("prevPage")
        
        const expectedPage = 2

        //act
        await prevPageButton.trigger("click");

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent![0]).toEqual([expectedPage, pageSize])
    })  

    it("does not emit event when prev page button clicked if already on first page", async () => {
        //arrange
        const page = 1;
        const pageSize = 5;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: 0
            }
        })
        const prevPageButton = wrapper.getElement("prevPage")

        //act
        await prevPageButton.trigger("click");

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent).toBe(undefined)
    })  

    it("emits event with correct params when next page button clicked", async () => {
        //arrange
        const page = 2;
        const pageSize = 5;
        const totalItems = 50;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: totalItems
            }
        })
        const nextPageButton = wrapper.getElement("nextPage")
        
        const expectedPage = 3

        //act
        await nextPageButton.trigger("click");

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent![0]).toEqual([expectedPage, pageSize])
    })  

    it("does not emit event when next page button clicked if already on last page", async () => {
        //arrange
        const page = 3;
        const pageSize = 5;
        const totalItems = 12;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: totalItems
            }
        })
        const nextPageButton = wrapper.getElement("nextPage")

        //act
        await nextPageButton.trigger("click");

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent).toBe(undefined)
    })  

    it("emits event with correct params when last page button clicked", async () => {
        //arrange
        const pageSize = 5;
        const totalItems = 46;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: 1,
                pageSize: pageSize,
                totalItems: totalItems
            }
        })
        const lastPageButton = wrapper.getElement("lastPage")
        
        const expectedPage = 10

        //act
        await lastPageButton.trigger("click");

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent![0]).toEqual([expectedPage, pageSize])
    })  

    it("emits event with correct params when page size is increased", async () => {
        //arrange
        const page = 8
        const pageSize = 3;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: 50
            }
        })
        const pageSizeDropdown = wrapper.getElement("selectedPageSize")
    
        const pageSizeToSelect = 20

        const expectedPage = 2
        const expectedPageSize = pageSizeToSelect.toString();
        //act
        await pageSizeDropdown.setValue(pageSizeToSelect)

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent![0]).toEqual([expectedPage, expectedPageSize])
    })  

    it("emits event with correct params when page size is decreased", async () => {
        //arrange
        const page = 2
        const pageSize = 50;
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: 100
            }
        })
        const pageSizeDropdown = wrapper.getElement("selectedPageSize")
    
        const pageSizeToSelect = 20

        const expectedPage = 3
        const expectedPageSize = pageSizeToSelect.toString();
        //act
        await pageSizeDropdown.setValue(pageSizeToSelect)

        //assert
        const pageChangeEvent = wrapper.emitted('pageChanged');
        expect(pageChangeEvent![0]).toEqual([expectedPage, expectedPageSize])
    })  

    it("displays correct number of total pages", async () => {
        //arrange
        const page = 2
        const pageSize = 11;
        const totalItems = 58
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: totalItems
            }
        })

        const expectedText = "Page 2 of 6"

        //act
        const totalPages = wrapper.getElement("totalPages")

        //assert
        expect(totalPages.html()).toContain(expectedText)
    })  

    it("displays correct number of items", async () => {
        //arrange
        const page = 2
        const pageSize = 11;
        const totalItems = 58
        const wrapper = mount(ContentPaginator, {
            props: {
                page: page,
                pageSize: pageSize,
                totalItems: totalItems
            }
        })

        const expectedText = "12 - 22 of 58"

        //act
        const totalItemsText = wrapper.getElement("totalItems")

        //assert
        expect(totalItemsText.html()).toContain(expectedText)
    })  
})