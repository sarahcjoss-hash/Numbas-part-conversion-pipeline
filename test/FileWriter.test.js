import fsPromises from 'fs/promises';
import os from 'os';
import path from 'path';
import { FileWriter } from '../utils/FileWriter.js';

async function waitForFileContent(filePath, expectedContent) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const content = await fsPromises.readFile(filePath, 'utf8');
      if (expectedContent === undefined || content === expectedContent) {
        return content;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }

  throw new Error(`Timed out waiting for ${filePath}`);
}

describe('FileWriter', () => {
  let temporaryDirectory;
  let fileWriter;

  beforeEach(async () => {
    temporaryDirectory = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'file-writer-test-'));
    fileWriter = new FileWriter();
  });

  afterEach(async () => {
    await fsPromises.rm(temporaryDirectory, { recursive: true, force: true });
  });

  it('writes JSON with the Numbas version header', async () => {
    const filePath = path.join(temporaryDirectory, 'exam.json');

    await fileWriter.stringifyJSONAndwriteToFile({ answer: 42 }, filePath);

    await expect(fsPromises.readFile(filePath, 'utf8')).resolves.toBe(
      '// Numbas version: finer_feedback_settings\n{\n  "answer": 42\n}'
    );
  });

  it('writes a report to a new file', async () => {
    const filePath = path.join(temporaryDirectory, 'report.txt');

    fileWriter.writeReportToFile('Report contents', filePath);

    await expect(waitForFileContent(filePath)).resolves.toBe('Report contents');
  });

  it('creates an error report with an ISO timestamp', async () => {
    const filePath = path.join(temporaryDirectory, 'errors.txt');

    fileWriter.createNewErrorReportFile(filePath);

    const content = await waitForFileContent(filePath);
    expect(content).toMatch(/^Error report file created: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\n$/);
  });

  it('appends a string to an existing error report', async () => {
    const filePath = path.join(temporaryDirectory, 'errors.txt');
    await fsPromises.writeFile(filePath, 'Existing errors\n', 'utf8');

    fileWriter.appendToErrorReportFile('New error\n', filePath);

    await expect(waitForFileContent(filePath, 'Existing errors\nNew error\n'))
      .resolves.toBe('Existing errors\nNew error\n');
  });
});
