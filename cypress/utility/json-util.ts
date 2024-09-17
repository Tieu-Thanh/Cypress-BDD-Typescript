export default class JsonUtil {

    // Method to read a JSON file using cy.fixture
    public static readJsonFile<T = any>(fileName: string): Cypress.Chainable<Record<string, T>> {
        return cy.fixture(fileName).then((jsonData) => {
            return jsonData as Record<string, T>;
        });
    }

    // Method to get all data from the JSON file
    public static getAllData<T = any>(fileName: string): Cypress.Chainable<Record<string, T>> {
        return this.readJsonFile<T>(fileName);
    }

    // Method to get data by a specific key from the JSON file
    public static getDataByKey<T = any>(fileName: string, dataKey: string): Cypress.Chainable<T> {
        return this.readJsonFile<T>(fileName).then((data) => {
            const specificData = data[dataKey];
            if (!specificData) {
                throw new Error(`Data for key ${dataKey} not found`);
            }
            return specificData;
        });
    }
}
