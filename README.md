# n8n-test-repo
Repo to test n8n workflow that runs a script

## Overview
This repository contains a TypeScript dummy script designed for n8n workflow integration. The script accepts input data (Zone ID, Purchase ID, Request ID), processes it, and outputs formatted JSON suitable for Slack integration.

## Usage

### Installation
```bash
npm install
npm run build
```

### Running the Script

#### Method 1: Command-line Arguments
```bash
node dummyScript.js <zoneId> <purchaseId> <requestId>
```

Example:
```bash
node dummyScript.js "zone-abc-123" 12345 67890
```

#### Method 2: Environment Variables (n8n preferred)
```bash
ZONE_ID="zone-xyz" PURCHASE_ID="99999" REQUEST_ID="11111" node dummyScript.js
```

### Output Format
The script outputs JSON with the following structure:
```json
{
  "success": true,
  "message": "Request processed successfully for Zone: zone-abc-123, Purchase: 12345, Request: 67890",
  "data": {
    "zoneId": "zone-abc-123",
    "purchaseId": 12345,
    "requestId": 67890
  },
  "timestamp": "2026-02-19T04:21:04.055Z"
}
```

### n8n Workflow Integration

1. **Form Input Node**: Collect Zone ID (string), Purchase ID (integer), and Request ID (integer)
2. **Execute Command Node**: Run the script with environment variables:
   - Set `ZONE_ID` to `{{$json["zoneId"]}}`
   - Set `PURCHASE_ID` to `{{$json["purchaseId"]}}`
   - Set `REQUEST_ID` to `{{$json["requestId"]}}`
   - Command: `node dummyScript.js`
3. **Slack Node**: Send the output JSON to Slack channel

### Error Handling
If validation fails, the script outputs an error JSON and exits with code 1:
```json
{
  "success": false,
  "message": "Purchase ID must be a positive integer",
  "data": null,
  "timestamp": "2026-02-19T04:21:10.959Z"
}
```

