import { parse } from 'uuid';

/**
 * Converts an Object ID to a SID
 * @param objectId The Microsoft Object ID (in GUID format) to convert to a SID.
 * @returns A Security Identifier, which is useful in Windows Server AD and Windows.
 */
export default function convertToSid(objectId: string): string {
    /** Regular expression that matches a UUID version 4 (random). */
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/gui;

    // Check if the provided input is a valid Object ID
    if (typeof objectId !== 'string' || !uuidRegex.test(objectId)) {
        // Throw an error if it is not a valid UUID
        throw new Error('The specified object ID is not a valid UUID v4!');
    }

    /** Array of bytes that represents the Object ID's parsed UUID format. */
    const bytes = [...parse(objectId)];

    // On the second 4 byte group, reverse its two two-byte group's order
    [bytes[4], bytes[5]] = [bytes[5], bytes[4]];
    [bytes[6], bytes[7]] = [bytes[7], bytes[6]];

    /** Container for the collection of bytes so that they are more easily accessed. */
    const dataView = new DataView(new Uint8Array(bytes).buffer);

    /** Computes components of the SID in where each element is a UInt32 type. */
    const sidComponents = Array.from({ 'length': 4 }, (_element, index) => dataView.getUint32(index * 4, index > 0));

    /** SID that resulted from combining and prefixing the sid components. */
    const resultantSid = `S-1-12-1-${ sidComponents.join('-') }`;

    // Return the computed SID to the caller
    return resultantSid;
}
