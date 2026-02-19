// Dummy script for n8n workflow
// Accepts input for Zone ID, Purchase ID, and Request ID
// Processes the data and outputs in JSON format for Slack integration

interface RequestData {
  zoneId: string;
  purchaseId: number;
  requestId: number;
}

interface OutputData {
  success: boolean;
  message: string;
  data: RequestData;
  timestamp: string;
}

/**
 * Process request data and generate output
 * @param zoneId - Zone identifier (string)
 * @param purchaseId - Purchase identifier (number)
 * @param requestId - Request identifier (number)
 * @returns Formatted output data
 */
function processDummyRequest(zoneId: string, purchaseId: number, requestId: number): OutputData {
  // Validate input
  if (!zoneId || typeof zoneId !== 'string') {
    throw new Error('Zone ID must be a non-empty string');
  }
  if (!Number.isInteger(purchaseId) || purchaseId <= 0) {
    throw new Error('Purchase ID must be a positive integer');
  }
  if (!Number.isInteger(requestId) || requestId <= 0) {
    throw new Error('Request ID must be a positive integer');
  }

  // Process the request (dummy processing)
  const requestData: RequestData = {
    zoneId,
    purchaseId,
    requestId
  };

  // Generate output
  const output: OutputData = {
    success: true,
    message: `Request processed successfully for Zone: ${zoneId}, Purchase: ${purchaseId}, Request: ${requestId}`,
    data: requestData,
    timestamp: new Date().toISOString()
  };

  return output;
}

// Main execution
// Read input from command-line arguments or environment variables
const args = process.argv.slice(2);

let zoneId: string;
let purchaseId: number;
let requestId: number;

if (args.length === 3) {
  // Input from command-line arguments
  zoneId = args[0];
  purchaseId = parseInt(args[1], 10);
  requestId = parseInt(args[2], 10);
} else {
  // Input from environment variables (n8n workflow context)
  zoneId = process.env.ZONE_ID || 'zone-default';
  purchaseId = parseInt(process.env.PURCHASE_ID || '0', 10);
  requestId = parseInt(process.env.REQUEST_ID || '0', 10);
}

try {
  const result = processDummyRequest(zoneId, purchaseId, requestId);
  
  // Output as JSON for n8n to consume
  console.log(JSON.stringify(result, null, 2));
  
  process.exit(0);
} catch (error) {
  const errorOutput = {
    success: false,
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    data: null,
    timestamp: new Date().toISOString()
  };
  
  console.error(JSON.stringify(errorOutput, null, 2));
  process.exit(1);
}
