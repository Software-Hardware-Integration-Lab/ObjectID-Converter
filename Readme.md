[![Unit Test](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/Unit-Test.yml/badge.svg)](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/Unit-Test.yml)
[![Lint Check](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/Lint.yml/badge.svg)](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/Lint.yml)
[![CodeQL](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/SAST.yml/badge.svg)](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/SAST.yml)

# ObjectID Converter

This project is a TypeScript native implementation of the Microsoft's cloud Object ID to Security Identifier (SID) process.

This project is not compatible with Windows Server Active Directory Object ID to SID conversions.

Inspiration for this project:
<https://oliverkieselbach.com/2020/05/13/powershell-helpers-to-convert-azure-ad-object-ids-and-sids/>

## Convert Object ID to SID

To convert your Object ID to a SID, use the `convertToSid()` function. It has only one parameter, the ObjectID, it takes a UUIDv4 format string then converts it to an Entra ID SID.

``` TypeScript
import { convertToSid } from 'ObjectID-Converter';

/** Object ID that will be converted to a SID. */
const objectId = 'f82d79af-1278-4894-ac01-d90e30875cf8';

/** SID that was converted from an Object ID */
const results = convertToSid(objectId);

// Render the results on the JavaScript Console.
console.log(results);
```

Results:

``` text
S-1-12-1-4163729839-1217663608-249102764-4166813488
```

## Convert SID to Object ID

Coming soon!
