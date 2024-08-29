# ObjectID Converter [![Unit Test](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/Unit-Test.yml/badge.svg)](https://github.com/Moot-Inc/ObjectID-Converter/actions/workflows/Unit-Test.yml) [![Lint Check](https://github.com/Software-Hardware-Integration-Lab/ObjectID-Converter/actions/workflows/Lint.yml/badge.svg)](https://github.com/Software-Hardware-Integration-Lab/ObjectID-Converter/actions/workflows/Lint.yml) [![CodeQL](https://github.com/Software-Hardware-Integration-Lab/ObjectID-Converter/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Software-Hardware-Integration-Lab/ObjectID-Converter/actions/workflows/github-code-scanning/codeql) [![NPM Version](https://img.shields.io/npm/v/%40shi-corp%2Fobjectid-converter)](https://www.npmjs.com/package/@shi-corp/objectid-converter)

This project is a TypeScript native implementation of the Microsoft's cloud Object ID to Security Identifier (SID) process.

This project is not compatible with Windows Server Active Directory (AD DS) Object ID to SID, or SID to Object ID conversions.

Inspiration for this project:
<https://oliverkieselbach.com/2020/05/13/powershell-helpers-to-convert-azure-ad-object-ids-and-sids/>

## Convert Object ID to SID

To convert your Object ID to a SID, use the `convertToSid()` function. It has only one parameter, the ObjectID, it takes a UUIDv4 format string then converts it to an Entra ID (Azure AD) compatible SID.

``` TypeScript
import { convertToSid } from '@shi-corp/objectid-converter';

/** Object ID that will be converted to a SID. */
const objectId = 'f82d79af-1278-4894-ac01-d90e30875cf8';

/** SID that was converted from an Object ID */
const results = convertToSid(objectId);

// Render the results on the JavaScript Console.
console.log(results);
```

### SID Result

``` text
S-1-12-1-4163729839-1217663608-249102764-4166813488
```

## Convert SID to Object ID

To convert your SID to an Object ID, use the `convertToObjectId()` function. It has only one parameter, the SID, it takes an Entra ID (Azure AD) compatible SID string then converts it to an Object ID (UUIDv4).

``` TypeScript
import { convertToObjectId } from '@shi-corp/objectid-converter';

/** Security Identifier (SID) that will be converted to an Object ID. */
const securityId = 'S-1-12-1-4163729839-1217663608-249102764-4166813488';

/** Object ID that was converted from a SID. */
const results = convertToObjectId(securityId);

// Render the results on the JavaScript Console.
console.log(results);
```

### Object ID Result

``` text
f82d79af-1278-4894-ac01-d90e30875cf8
```
