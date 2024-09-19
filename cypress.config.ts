import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
    e2e: {
        baseUrl: 'https://www.automationexercise.com',
        specPattern: 'cypress/e2e/**/*.feature',
        supportFile: 'cypress/support/index.ts',
        chromeWebSecurity: false,
        watchForFileChanges: true,  // Enable watching for file changes
        setupNodeEvents(on, config) {
            addCucumberPreprocessorPlugin(on, config);

            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on('file:preprocessor', bundler);
            return config;
        },
        env: {
            // TAGS: '@Successful', // Default tag
        }
    },
});
