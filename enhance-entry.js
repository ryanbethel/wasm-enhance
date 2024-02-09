import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'

// Read input from stdin
const input = readInput();

let elements = {
  "my-header": function MyHeader({ html }) {
    return html`<h1><slot></slot></h1> `
  }
}
const initialState = {}

// Write the result to stdout
writeOutput(ssr({ elements, initialState, markup: input.markup }))





function ssr({ elements = {}, initialState = {}, markup = '' }) {
  const html = enhance({
    styleTransforms: [styleTransform],
    elements,
    initialState,
  })
  return html`${markup}`
}


// Read input from stdin
function readInput() {
  const chunkSize = 1024;
  const inputChunks = [];
  let totalBytes = 0;

  // Read all the available bytes
  while (1) {
    const buffer = new Uint8Array(chunkSize);
    // Stdin file descriptor
    const fd = 0;
    const bytesRead = Javy.IO.readSync(fd, buffer);

    totalBytes += bytesRead;
    if (bytesRead === 0) {
      break;
    }
    inputChunks.push(buffer.subarray(0, bytesRead));
  }

  // Assemble input into a single Uint8Array
  const { finalBuffer } = inputChunks.reduce((context, chunk) => {
    context.finalBuffer.set(chunk, context.bufferOffset);
    context.bufferOffset += chunk.length;
    return context;
  }, { bufferOffset: 0, finalBuffer: new Uint8Array(totalBytes) });

  return JSON.parse(new TextDecoder().decode(finalBuffer));
}

// Write output to stdout
function writeOutput(output) {
  const encodedOutput = new TextEncoder().encode(JSON.stringify(output));
  const buffer = new Uint8Array(encodedOutput);
  // Stdout file descriptor
  const fd = 1;
  Javy.IO.writeSync(fd, buffer);
}

function mapStringToFunctionObj(obj) {
  const functionObj = {};
  for (const [key, funcString] of Object.entries(obj)) {
    functionObj[key] = new Function("return " + funcString);
  }
  return functionObj;
}
