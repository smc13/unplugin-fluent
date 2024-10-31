import { defineConfig } from 'vite'
import inspect from 'vite-plugin-inspect'
import fluent from '../src/vite'

export default defineConfig({
  plugins: [inspect(), fluent({ writeTypes: true })],
})
