import chai from 'chai';
import { convertToSid } from '../src/toSid';
import { it } from 'mocha';
import { randomUUID } from 'crypto';

describe('Convert To SID', () => {
    describe('Successful Tests', () => {
        it('Hard Coded SID - 1', (done) => {
            /** First hard coded Object ID to test. */
            const objectIdToTest1 = '9ee93cd2-da63-42b6-98bb-1f313f2126c7';

            /** First hard coded result for a successful SID conversion. */
            const expectedSid1 = 'S-1-12-1-2666085586-1119279715-824163224-3341164863';

            /** Results fo the first hard coded SID conversion. */
            const results1 = convertToSid(objectIdToTest1);

            // Check results for hard coded operation 1
            chai.expect(results1).to.be.a('string');
            chai.expect(results1).to.equal(expectedSid1);
            chai.expect(results1).to.be.lengthOf(51);

            // Finish testing section
            done();
        });

        it('Hard Coded SID - 2', (done) => {
            /** Second hard coded Object ID to test. */
            const objectIdToTest2 = '95bd3dd0-913a-44b8-9e08-db3fddc72f83';

            /** Second hard coded result for a successful SID conversion. */
            const expectedSid2 = 'S-1-12-1-2512207312-1152946490-1071319198-2200946653';

            /** Results fo the second hard coded SID conversion. */
            const results2 = convertToSid(objectIdToTest2);

            // Check results for hard coded operation 2
            chai.expect(results2).to.be.a('string');
            chai.expect(results2).to.equal(expectedSid2);
            chai.expect(results2).to.be.lengthOf(52);

            // Finish testing section
            done();
        });

        it('Random SID', (done) => {
            /** Randomly generated UUID to test. */
            const generatedUuid = randomUUID();

            /** Results of the conversion of the randomly generated SID. */
            const resultsRandom = convertToSid(generatedUuid);

            // Check results for a randomly generated SID
            chai.expect(resultsRandom).to.be.a('string');
            chai.expect(resultsRandom).length.to.be.lengthOf.below(257);

            // Finish testing section
            done();
        });
    });
    describe('Expected Failures', () => {
        it('Reject Invalid Type - Junk String', (done) => {
            // Test Junk String input
            chai.expect(convertToSid.bind(convertToSid, 'Hello world!')).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Invalid UUID', (done) => {
            // Test Junk String input
            chai.expect(convertToSid.bind(convertToSid, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Number', (done) => {
            // @ts-expect-error Test number input
            chai.expect(convertToSid.bind(convertToSid, 123456)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Boolean', (done) => {
            // @ts-expect-error Test boolean input
            chai.expect(convertToSid.bind(convertToSid, true)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Regex', (done) => {
            // @ts-expect-error Test Regex input
            chai.expect(convertToSid.bind(convertToSid, /^something$/gum)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Function', (done) => {
            // @ts-expect-error Test Function input
            chai.expect(convertToSid.bind(convertToSid, () => true)).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });

        it('Reject Invalid Type - Object', (done) => {
            // @ts-expect-error Test Function input
            chai.expect(convertToSid.bind(convertToSid, { 'hello': 'world!' })).to.throw('The specified object ID is not a valid UUID v4!');

            // Finish testing section
            done();
        });
    });
});
