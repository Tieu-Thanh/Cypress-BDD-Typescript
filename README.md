# Cypress BDD with TypeScript

This project is a boilerplate for using Cypress with BDD (Behavior-Driven Development) and TypeScript. It follows the Page Object Model (POM) design pattern for organizing test cases and step definitions.

## Project Structure

The project has the following folder structure:

```
CYPRESSFW-BDD-TYPESCRIPT/
├───data_objects
│       account-dto.ts
├───downloads
├───e2e
│   ├───features
│   │       user-registration.feature
│   └───step_definitions
│           base-page-steps.ts
│           created-account-steps.ts
│           home-page-steps.ts
│           login-page-steps.ts
│           signup-page-steps.ts
├───fixtures
│       example.json
│       users.json
├───page_objects
│       base-page.ts
│       created-account-page.ts
│       home-page.ts
│       login-page.ts
│       signup-page.ts
├───screenshots
├───support
│       commands.ts
│       e2e.ts
│       index.ts
│       web-element.ts
│       window-handler.ts
└───utility
        json-util.ts
```

### Directory and File Overview

1. **`data_objects/`**:
   Contains data transfer objects (DTOs), like `account-dto.ts`, which are used to structure and handle data across the project.

2. **`downloads/`**:
   A folder for storing files that are downloaded during test execution.

3. **`e2e/`**:
   - **`features/`**:
     Contains the `.feature` files, which define the BDD test scenarios using Gherkin syntax.
     - **`user-registration.feature`**:
       Defines the scenarios for user registration flow, both successful and unsuccessful.
   - **`step_definitions/`**:
     Contains the step definitions that map the Gherkin steps from the feature files to actual test actions.
     - **`base-page-steps.ts`**:
       Steps related to common base-page functionality.
     - **`created-account-steps.ts`**:
       Steps related to actions on the created account page.
     - **`home-page-steps.ts`**:
       Steps related to actions on the home page.
     - **`login-page-steps.ts`**:
       Steps related to the login page actions.
     - **`signup-page-steps.ts`**:
       Steps related to the signup page actions.

4. **`fixtures/`**:
   Contains test data that can be loaded into tests.
   - **`example.json`**:
     An example fixture file for generic test data.
   - **`users.json`**:
     Contains predefined users for testing user-related scenarios.

5. **`page_objects/`**:
   Implements the Page Object Model (POM) design. Each file represents a page on the website, and all the interactions related to that page are encapsulated within its corresponding file.
   - **`base-page.ts`**:
     A base class for all pages that contains common functions shared across different pages.
   - **`created-account-page.ts`**:
     Page object model for the account creation confirmation page.
   - **`home-page.ts`**:
     Represents the home page of the application.
   - **`login-page.ts`**:
     Represents the login page and interactions such as filling out login credentials.
   - **`signup-page.ts`**:
     Represents the signup page and actions like filling out the registration form.

6. **`screenshots/`**:
   Stores screenshots taken during test execution, typically on failure.

7. **`support/`**:
   Contains reusable Cypress commands and configuration files.
   - **`commands.ts`**:
     Custom Cypress commands defined here can be used throughout the tests.
   - **`e2e.ts`**:
     Entry point for configuring Cypress before tests run.
   - **`index.ts`**:
     Support file that imports custom commands and configuration.
   - **`web-element.ts`**:
     Contains utility functions to interact with web elements.
   - **`window-handler.ts`**:
     Utility to handle window events like window resizing or redirects.

8. **`utility/`**:
   Utility files that provide additional helper functions.
   - **`json-util.ts`**:
     Utility functions to work with JSON data, such as parsing and manipulating JSON files.

## Dependencies

The project uses the following key dependencies in `devDependencies`:

- **`@badeball/cypress-cucumber-preprocessor`**:
  A preprocessor that enables BDD-style test cases using Cucumber and Cypress. This package allows the use of `.feature` files and maps them to step definitions.

- **`@bahmutov/cypress-esbuild-preprocessor`**:
  Enables faster TypeScript transpiling with esbuild in Cypress tests.

- **`@shelex/cypress-allure-plugin`**:
  Integrates Allure reporting with Cypress for advanced test reports and tracking.

<!-- - **`allure-commandline`**:
  A command-line interface to generate and display Allure test reports. -->

- **`cross-env`**:
  Provides a cross-platform way to set environment variables. This is useful for ensuring the same scripts work on both Windows and Unix-based systems.

- **`cypress`**:
  The core testing framework used for end-to-end testing. Provides a rich set of features for browser automation.

- **`cypress-xpath`**:
  Adds support for XPath selectors in Cypress, allowing tests to locate elements using XPath expressions.

- **`esbuild`**:
  A fast JavaScript bundler and minifier, used to speed up TypeScript and JavaScript transpiling.

- **`typescript`**:
  The programming language that builds on JavaScript by adding static type definitions. The project is written in TypeScript for better maintainability and type safety.

## How to Run the Project

### Prerequisites

- Ensure you have Node.js and npm installed on your machine.
- Install the project dependencies by running:

  ```bash
  npm install
  ```

### Running Tests

1. **Open Cypress in the interactive mode**:

   This opens the Cypress Test Runner where you can run tests manually:

   ```bash
   npm run cy:open
   ```

2. **Run tests in headless mode**:

   This runs the tests in the terminal without opening the Test Runner UI:

   ```bash
   npm run cy:run
   ```

3. **Run tests in a specific browser**:

   You can specify a browser dynamically using the command (adjust for supported browsers like `chrome`, `firefox`, or `edge`):

   ```bash
   npm run cy:open:e2e --browser=edge
   ```

4. **Run tests with a specific tag**:

   If you want to run only tests that are tagged with a specific tag, use the following command (e.g., `@Successful`):

   ```bash
   npm run cy:run:tag --tag=Successful
   ```

<!-- ### Generate Allure Report -->

<!-- 1. After running the tests, you can generate the Allure report by running:

   ```bash
   allure generate
   ```

2. To open the Allure report, run: -->

   <!-- ```bash
   allure open
   ``` -->

### Running Tests with Tags

To run test cases based on specific tags, use the following format:

```bash
npm run cy:run:tag --tag=Successful
```

This will execute only the test cases tagged as `@Successful`.
