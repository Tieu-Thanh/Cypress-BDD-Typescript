export default class RandomUtil {
    // Generate a random integer between a given range (inclusive)
    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate a random floating point number between a given range (inclusive)
    static getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    // Generate a random string of a specified length using the given characters
    static getRandomString(length: number, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
        let result = '';
        const charsLength = chars.length;
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
        }
        return result;
    }

    // Pick a random element from an array
    static getRandomElement<T>(arr: T[]): T {
        const randomIndex = RandomUtil.getRandomInt(0, arr.length - 1);
        return arr[randomIndex];
    }

    // Pick multiple random unique elements from an array
    static getRandomElements<T>(arr: T[], count: number): T[] {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Generate a random boolean value
    static getRandomBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    // Log random data using Cypress logging
    static logRandomData(message: string, data: any) {
        cy.log(`${message}: ${JSON.stringify(data)}`);
    }
}
