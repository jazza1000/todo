import { DOMWrapper } from '@vue/test-utils';

declare module '@vue/test-utils' {
  export class VueWrapper {
    getElement(id: string);
  }
}