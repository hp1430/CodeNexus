import fs from 'fs';
import path from 'path';
import tar from 'tar-fs';
import { v4 as uuid } from 'uuid';

import docker from '../container/docker.js';

export const executionService = async ({ roomId, language, code }) => {
  try {
    // only python support for now
    if (language !== 'python') {
      return {
        output: '',
        error: 'Unsupported language'
      };
    }

    // get running container
    const container = docker.getContainer('python-sandbox');

    // create unique execution folder
    const jobId = uuid();

    const tempDir = path.join(
      process.cwd(),
      'src/projects',
      `${roomId}-${jobId}`
    );

    fs.mkdirSync(tempDir, {
      recursive: true
    });

    const fileName = `${jobId}.py`;

    // create python file
    const codeFilePath = path.join(tempDir, fileName);

    fs.writeFileSync(codeFilePath, code);

    // create tar stream
    const tarStream = tar.pack(tempDir);

    // copy files into container
    await container.putArchive(tarStream, {
      path: `/app`
    });

    // execute python file inside container
    const execInstance = await container.exec({
      Cmd: ['python', `/app/${fileName}`],
      AttachStdout: true,
      AttachStderr: true
    });

    // start execution
    const stream = await execInstance.start({
      hijack: true,
      stdin: false
    });

    let output = '';
    let errorOutput = '';

    const stdoutStream = {
      write: (chunk) => {
        output += chunk.toString();
      }
    };

    const stderrStream = {
      write: (chunk) => {
        errorOutput += chunk.toString();
      }
    };

    container.modem.demuxStream(stream, stdoutStream, stderrStream);

    await new Promise((resolve) => {
      stream.on('end', resolve);
    });

    return {
      output,
      error: errorOutput
    };
  } catch (error) {
    return {
      output: '',
      error: error.message
    };
  }
};
