/* import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
 */

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Update with your app's URL
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.{js,ts,jsx,tsx}',
  },
  component: {
    supportFile: 'cypress/support/component.js',
    specPattern: 'cypress/component/**/*.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'react', // Replace with your framework (e.g., vue, angular)
      bundler: 'vite',    // Replace with your bundler (e.g., webpack)
    },
  },
});
