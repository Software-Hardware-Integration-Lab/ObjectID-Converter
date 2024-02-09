import { stringify } from 'uuid';

/**
 * Converts a a SID to an Object ID.
 * @param sid Azure/Entra/M365 Security Identifier to be converted to an Object ID/GUID (UUID v4)
 * @returns Object ID equivalent of the input SID.
 */
export function convertToObjectId(sid: string): string {
    // Input Validation
    if (typeof sid !== 'string') {
        throw new Error('The provided sid is not a string!');
    } else if (!sid.match(/^S-1-12-1-\d{8,10}-\d{8,10}-\d{8,10}-\d{8,10}$/gum)) {
        throw new Error('The provided SID is not an Entra ID SID!');
    }

    /** The four parts of the SID. */
    const splitSid: number[] = sid.
        replace(/^S-1-12-1-/gum, '').
        split('-').
        map((element) => parseInt(element, 10));

    /** Buffer format of the SID. */
    const sidBuffer = new Uint8Array(new Uint32Array(splitSid).buffer);

    // Reverse the order of the first byte group
    [sidBuffer[0], sidBuffer[3]] = [sidBuffer[3], sidBuffer[0]];
    [sidBuffer[1], sidBuffer[2]] = [sidBuffer[2], sidBuffer[1]];

    // On the second 4 byte group, reverse its two two-byte group's order
    [sidBuffer[5], sidBuffer[4]] = [sidBuffer[4], sidBuffer[5]];
    [sidBuffer[7], sidBuffer[6]] = [sidBuffer[6], sidBuffer[7]];

    /** Object ID equivalent of the input SID. */
    const objectId = stringify(sidBuffer);

    // Return the Object ID to the caller
    return objectId;
}
