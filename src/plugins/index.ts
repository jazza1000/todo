import { pinia } from './pinia';
import type { App } from 'vue';

export const inititalisePlugins = (app: App) => {
    app.use(pinia)
}