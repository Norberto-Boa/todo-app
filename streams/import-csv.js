import { parse } from "csv-parse";
import fs from "fs";

const csvFilePath = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvFilePath);

const parser = parse({
  delimiter: ',',
  skip_empty_lines: true,
  from_line: 2
});

async function read() {
  const linesToParse = stream.pipe(parser);

  for await (const line of linesToParse) {
    const [title, description] = line;

    await fetch('http://localhost:3000/todo', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
      })
    });
  }
}

read();