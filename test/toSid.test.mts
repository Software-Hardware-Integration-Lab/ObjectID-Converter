import { convertToObjectId, convertToSid } from '../src/index.mjs';
import { expect } from 'chai';
import { it } from 'mocha';
import { randomUUID } from 'crypto';

describe('Convert To SID', () => {
    describe('Successful Tests', () => {
        it('Hard Coded SID - 1', (done) => {
            /** Hard coded Object ID to test. */
            const objectIdToTest = '9ee93cd2-da63-42b6-98bb-1f313f2126c7';

            /** Hard coded result for a successful SID conversion. */
            const expectedSid = 'S-1-12-1-2666085586-1119279715-824163224-3341164863';

            /** Results fo the hard coded SID conversion. */
            const results = convertToSid(objectIdToTest);

            // Check results for hard coded operation
            expect(results).to.be.a('string');
            expect(results).to.equal(expectedSid);
            expect(results).to.be.lengthOf(51);

            // Finish testing section
            done();
        });

        it('Hard Coded SID - 2', (done) => {
            /** Hard coded Object ID to test. */
            const objectIdToTest = '95bd3dd0-913a-44b8-9e08-db3fddc72f83';

            /** Hard coded result for a successful SID conversion. */
            const expectedSid = 'S-1-12-1-2512207312-1152946490-1071319198-2200946653';

            /** Results fo the hard coded SID conversion. */
            const results = convertToSid(objectIdToTest);

            // Check results for hard coded operation
            expect(results).to.be.a('string');
            expect(results).to.equal(expectedSid);
            expect(results).to.be.lengthOf(52);

            // Finish testing section
            done();
        });

        it('Random SID', (done) => {
            /** Randomly generated UUID to test. */
            const generatedObjectId = randomUUID();

            /** Results of the conversion of the randomly generated SID. */
            const resultsRandom = convertToSid(generatedObjectId);

            /** ID that should match the generated Object ID. */
            const validationId = convertToObjectId(resultsRandom);

            // Check results for a randomly generated SID
            expect(resultsRandom).to.be.a('string');
            expect(resultsRandom).length.to.be.lengthOf.below(257);
            expect(validationId).to.equal(generatedObjectId);

            // Finish testing section
            done();
        });
    });
    describe('Expected Failures', () => {
        it('Reject Invalid Type - Junk String', (done) => {
            // Test Junk String input
            expect(convertToSid.bind(convertToSid, 'Hello world!')).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Invalid UUID', (done) => {
            // Test Junk String input
            expect(convertToSid.bind(convertToSid, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Number', (done) => {
            // @ts-expect-error Test number input
            expect(convertToSid.bind(convertToSid, 123456)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Boolean', (done) => {
            // @ts-expect-error Test boolean input
            expect(convertToSid.bind(convertToSid, true)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Regex', (done) => {
            // @ts-expect-error Test Regex input
            expect(convertToSid.bind(convertToSid, /^something$/gum)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Function', (done) => {
            // @ts-expect-error Test Function input
            expect(convertToSid.bind(convertToSid, () => true)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Object', (done) => {
            // @ts-expect-error Test Function input
            expect(convertToSid.bind(convertToSid, { 'hello': 'world!' })).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });
    });
});
