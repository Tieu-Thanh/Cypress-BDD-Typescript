export default class APIClient {
    private baseUrl: string;
    private endpoint: string = '';
    private body: any = null;
    private headers: { [key: string]: string } = {};
    private queryParams: { [key: string]: string } = {};

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Method to set the endpoint
    public addEndpoint(endpoint: string): this {
        this.endpoint = endpoint;
        return this;
    }

    // Method to set the request body
    public addBody(body: any): this {
        this.body = body;
        return this;
    }

    // Method to add multiple headers
    public addHeaders(headers: { [key: string]: string }): this {
        this.headers = { ...this.headers, ...headers };
        return this;
    }

    // Method to add a single header
    public addHeader(key: string, value: string): this {
        this.headers[key] = value;
        return this;
    }

    // Method to add a query parameter
    public addQueryParam(key: string, value: string): this {
        this.queryParams[key] = value;
        return this;
    }

    // Method to add multiple query parameters
    public addQueryParams(params: { [key: string]: string }): this {
        this.queryParams = { ...this.queryParams, ...params };
        return this;
    }

    // Method to execute a GET request
    public executeGet(): Cypress.Chainable<Cypress.Response<any>> {
        return this.sendRequest('GET');
    }

    // Method to execute a POST request
    public executePost(): Cypress.Chainable<Cypress.Response<any>> {
        return this.sendRequest('POST');
    }

    // Method to execute a PUT request
    public executePut(): Cypress.Chainable<Cypress.Response<any>> {
        return this.sendRequest('PUT');
    }

    // Method to execute a DELETE request
    public executeDelete(): Cypress.Chainable<Cypress.Response<any>> {
        return this.sendRequest('DELETE');
    }

    // Private method to send the request
    private sendRequest(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): Cypress.Chainable<Cypress.Response<any>> {
        const url = this.buildUrl();
        const options: Partial<Cypress.RequestOptions> = {
            method: method,
            url: url,
            headers: this.headers,
            failOnStatusCode: false, // Allows assertions to handle status codes
        };

        if (this.body && method !== 'GET') {
            options.body = this.body;
        }

        // Clear the internal state after request
        this.reset();

        return cy.request(options);
    }

    // Private method to build the full URL with query parameters
    private buildUrl(): string {
        let url = `${this.baseUrl}${this.endpoint}`;
        const queryParamsString = new URLSearchParams(this.queryParams).toString();
        if (queryParamsString) {
            url += `?${queryParamsString}`;
        }
        return url;
    }

    // Private method to reset the internal state
    private reset(): void {
        this.endpoint = '';
        this.body = null;
        this.headers = {};
        this.queryParams = {};
    }

    // Assertion methods (if needed)
    public assertStatusCode(response: Cypress.Response<any>, expectedStatusCode: number) {
        expect(response.status).to.eq(expectedStatusCode);
    }

    public assertResponseBodyContains(response: Cypress.Response<any>, key: string, value: any) {
        expect(response.body[key]).to.eq(value);
    }

    public assertResponseBodyHasKey(response: Cypress.Response<any>, key: string) {
        expect(response.body).to.have.property(key);
    }

    public assertResponseTime(response: Cypress.Response<any>, maxTimeInMs: number) {
        expect(response.duration).to.be.lessThan(maxTimeInMs);
    }
}
