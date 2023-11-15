import { VueWrapper, DOMWrapper } from "@vue/test-utils"

export const TestTagPlugin = (wrapper: VueWrapper) => {

    function getElement(selector: string) {
        return wrapper.get(`[data-test="${selector}"]`)
    }

    return {
        getElement
    }
}