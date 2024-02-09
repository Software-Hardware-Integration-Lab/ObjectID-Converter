import { convertToObjectId, convertToSid } from '../src/index.mjs';
import { expect } from 'chai';
import { it } from 'mocha';
import { randomUUID } from 'crypto';
import { validate } from 'uuid';

describe('Convert To Object ID', () => {
    describe('Successful Tests', () => {
        it('Hard Coded Object ID - 1', (done) => {
            /** First hard coded Object ID to test. */
            const expectedObjectId = '9ee93cd2-da63-42b6-98bb-1f313f2126c7';

            /** First hard coded result for a successful SID conversion. */
            const sidToTest = 'S-1-12-1-2666085586-1119279715-824163224-3341164863';

            /** Results fo the first hard coded SID conversion. */
            const results = convertToObjectId(sidToTest);

            // Check results for hard coded operation 1
            expect(results).to.be.a('string');
            expect(results).to.equal(expectedObjectId);
            expect(results).to.be.lengthOf(36);

            // Finish testing section
            done();
        });

        it('Hard Coded Object ID - 2', (done) => {
            /** Second hard coded Object ID to test. */
            const expectedObjectId = '95bd3dd0-913a-44b8-9e08-db3fddc72f83';

            /** Second hard coded result for a successful SID conversion. */
            const sidToTest = 'S-1-12-1-2512207312-1152946490-1071319198-2200946653';

            /** Results fo the second hard coded SID conversion. */
            const results = convertToObjectId(sidToTest);

            // Check results for hard coded operation 2
            expect(results).to.be.a('string');
            expect(results).to.equal(expectedObjectId);
            expect(results).to.be.lengthOf(36);

            // Finish testing section
            done();
        });

        it('Random SID', (done) => {
            /** Randomly generated UUID to test. */
            const expectedObjectId = randomUUID();

            /** SID to convert to an Object ID. */
            const sidToTest = convertToSid(expectedObjectId);

            /** Results of the conversion of the randomly generated SID. */
            const resultsRandom = convertToObjectId(sidToTest);

            // Check results for a randomly generated SID
            expect(resultsRandom).to.be.a('string');
            expect(resultsRandom).to.be.equal(expectedObjectId);
            expect(resultsRandom).to.be.lengthOf(36);
            expect(validate(resultsRandom)).to.equal(true);

            // Finish testing section
            done();
        });
    });
    describe('Expected Failures', () => {
        it('Reject Invalid Type - Junk String', (done) => {
            // Test Junk String input
            expect(convertToObjectId.bind(convertToObjectId, 'Hello world!')).to.throw('The provided SID is not an Entra ID SID!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Invalid SID', (done) => {
            // Test Junk String input
            expect(convertToObjectId.bind(convertToObjectId, 'S-1-5-711957920-1182741761-3248840125-1169651596')).to.throw('The provided SID is not an Entra ID SID!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Number', (done) => {
            // @ts-expect-error Test number input
            expect(convertToObjectId.bind(convertToObjectId, 123456)).to.throw('The provided sid is not a string!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Boolean', (done) => {
            // @ts-expect-error Test boolean input
            expect(convertToObjectId.bind(convertToObjectId, true)).to.throw('The provided sid is not a string!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Regex', (done) => {
            // @ts-expect-error Test Regex input
            expect(convertToObjectId.bind(convertToObjectId, /^something$/gum)).to.throw('The provided sid is not a string!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Function', (done) => {
            // @ts-expect-error Test Function input
            expect(convertToObjectId.bind(convertToObjectId, () => true)).to.throw('The provided sid is not a string!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Object', (done) => {
            // @ts-expect-error Test Function input
            expect(convertToObjectId.bind(convertToObjectId, { 'hello': 'world!' })).to.throw('The provided sid is not a string!');

            // Finish testing section
            done();
        });
    });
});
