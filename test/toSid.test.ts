import { convertToObjectId, convertToSid } from '../src/index.js';
import { suite, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { randomUUID } from 'node:crypto';

await suite('Convert To SID', async () => {
    await test('Successful Tests', async () => {
        await test('Hard Coded SID - 1', () => {
            /** Hard coded Object ID to test. */
            const objectIdToTest = '9ee93cd2-da63-42b6-98bb-1f313f2126c7';

            /** Hard coded result for a successful SID conversion. */
            const expectedSid = 'S-1-12-1-2666085586-1119279715-824163224-3341164863';

            /** Results fo the hard coded SID conversion. */
            const results = convertToSid(objectIdToTest);

            // Ensure the output is the exact same as the expected SID
            assert.deepStrictEqual(results, expectedSid);
        });

        await test('Hard Coded SID - 2', () => {
            /** Hard coded Object ID to test. */
            const objectIdToTest = '95bd3dd0-913a-44b8-9e08-db3fddc72f83';

            /** Hard coded result for a successful SID conversion. */
            const expectedSid = 'S-1-12-1-2512207312-1152946490-1071319198-2200946653';

            /** Results fo the hard coded SID conversion. */
            const results = convertToSid(objectIdToTest);

            // Ensure the output is the exact same as the expected SID
            assert.deepStrictEqual(results, expectedSid);
        });

        await test('Random SID', () => {
            /** Randomly generated UUID to test. */
            const generatedObjectId = randomUUID();

            /** Results of the conversion of the randomly generated SID. */
            const resultsRandom = convertToSid(generatedObjectId);

            /** ID that should match the generated Object ID. */
            const validationId = convertToObjectId(resultsRandom);

            // Ensure the output is the exact same as the expected SID
            assert.deepStrictEqual(validationId, generatedObjectId);
        });
    });

    await test('Expected Failures', async () => {
        await test('Reject Invalid Data - Junk String', () => {
            // Test Junk String input
            assert.throws(() => convertToSid('Hello world!'));
        });

        await test('Reject Invalid Data - Invalid UUID', () => {
            // Test Junk String input
            assert.throws(() => convertToSid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'));
        });

        await test('Reject Invalid Type - Number', () => {
            // @ts-expect-error - Testing invalid type input
            assert.throws(() => convertToSid(123456));
        });

        await test('Reject Invalid Type - Boolean', () => {
            // @ts-expect-error - Testing invalid type input
            assert.throws(() => convertToSid(true));
        });

        await test('Reject Invalid Type - Regex', () => {
            // @ts-expect-error - Testing invalid type input
            assert.throws(() => convertToSid(/^something$/gum));
        });

        await test('Reject Invalid Type - Function', () => {
            // @ts-expect-error - Testing invalid type input
            assert.throws(() => convertToSid(() => true));
        });

        await test('Reject Invalid Type - Object', () => {
            // @ts-expect-error - Testing invalid type input
            assert.throws(() => convertToSid({ 'hello': 'world!' }));
        });
    });
});
