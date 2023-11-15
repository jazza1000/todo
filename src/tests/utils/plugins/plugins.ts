import { config } from '@vue/test-utils'
import { TestTagPlugin } from './TestTagPlugin'

export const usePlugins = () => {
    config.plugins.VueWrapper.install(TestTagPlugin)
} 