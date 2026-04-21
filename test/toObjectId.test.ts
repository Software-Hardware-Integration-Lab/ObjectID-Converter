import { convertToObjectId, convertToSid } from '../src/index.js';
import { equals, type tags } from 'typia';
import { suite, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { randomUUID } from 'node:crypto';

await suite('Convert To Object ID', async () => {
    await test('Successful Tests', async () => {
        await test('Hard Coded Object ID - 1', () => {
            /** First hard coded Object ID to test. */
            const expectedObjectId = '9ee93cd2-da63-42b6-98bb-1f313f2126c7';

            /** First hard coded result for a successful SID conversion. */
            const sidToTest = 'S-1-12-1-2666085586-1119279715-824163224-3341164863';

            /** Results fo the first hard coded SID conversion. */
            const results = convertToObjectId(sidToTest);

            // Ensure that the output matches the resultant object ID
            assert.deepStrictEqual(results, expectedObjectId);
        });

        await test('Hard Coded Object ID - 2', () => {
            /** Second hard coded Object ID to test. */
            const expectedObjectId = '95bd3dd0-913a-44b8-9e08-db3fddc72f83';

            /** Second hard coded result for a successful SID conversion. */
            const sidToTest = 'S-1-12-1-2512207312-1152946490-1071319198-2200946653';

            /** Results fo the second hard coded SID conversion. */
            const results = convertToObjectId(sidToTest);

            assert.deepStrictEqual(results, expectedObjectId);
        });

        await test('Random SID', () => {
            /** Randomly generated UUID to test. */
            const expectedObjectId = randomUUID();

            /** SID to convert to an Object ID. */
            const sidToTest = convertToSid(expectedObjectId);

            /** Results of the conversion of the randomly generated SID. */
            const resultsRandom = convertToObjectId(sidToTest);

            // Ensure that the output matches the original object ID
            assert.deepStrictEqual(resultsRandom, expectedObjectId);

            // Ensure that the output is a GUID
            assert.deepStrictEqual(equals<string & tags.Format<'uuid'>>(resultsRandom), true);
        });
    });

    await test('Expected Failures', async () => {
        await test('Reject Invalid Data - Junk String', () => {
            // Test Junk String input
            assert.throws(() => convertToObjectId('Hello world!'));
        });

        await test('Reject Invalid Data - Invalid SID', () => {
            // Test Junk String input
            assert.throws(() => convertToObjectId('S-1-5-711957920-1182741761-3248840125-1169651596'));
        });

        await test('Reject Invalid Type - Number', () => {
            // @ts-expect-error Test number input
            assert.throws(() => convertToObjectId(123456));
        });

        await test('Reject Invalid Type - Boolean', () => {
            // @ts-expect-error Test Boolean input
            assert.throws(() => convertToObjectId(true));
        });

        await test('Reject Invalid Type - Regex', () => {
            // @ts-expect-error Test Regex input
            assert.throws(() => convertToObjectId(/^something$/gum));
        });

        await test('Reject Invalid Type - Function', () => {
            // @ts-expect-error Test Function input
            assert.throws(() => convertToObjectId(() => true));
        });

        await test('Reject Invalid Type - Object', () => {
            // @ts-expect-error Test Object input
            assert.throws(() => convertToObjectId({ 'hello': 'world!' }));
        });
    });
});
