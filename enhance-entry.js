import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'

// export default function createHtmlRenderer ({elements, initialState}) {
//   const html = enhance({
//     styleTransforms: [ styleTransform ],
//     elements,
//     initialState,
//   })

//   return html
// }

let elements = {
  "my-heading": function MyHeading({ html }) {
    return html`
<h1>
  <slot></slot>
</h1>
  `
  }
}
elements = { thing: "thang" }
const initialState = {}
const page = '<my-heading>Hello World</my-heading><p>Some More Stuff</p>'



// export default function helloWorld() {
export default function helloWorld() {
  const html = enhance({
    styleTransforms: [styleTransform],
    elements,
    initialState,
  })

  return html`${page}`
}

writeOutput(helloWorld())


// Read input from stdin
const input = readInput();
// Call the function with the input
const result = foo(input);
// Write the result to stdout
writeOutput(result);

// The main function.
function foo(input) {
  return { foo: input.n + 1, newBar: input.bar + "!" };
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
