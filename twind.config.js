import { defineConfig } from '@twind/core'
import presetTW from "@twind/preset-tailwind"
import presetAutoprefix from '@twind/preset-autoprefix'


export default defineConfig({
    presets:[
        presetTW(),
        presetAutoprefix()
    ]
})