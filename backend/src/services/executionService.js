import fs from 'fs';
import path from 'path';
import tar from 'tar-fs';
import { v4 as uuid } from 'uuid';

import docker from '../container/docker.js';

const EXECUTION_TIMEOUT = 5000;
const MAX_OUTPUT_SIZE = 100000;

export const executionService = async ({ roomId, language, code }) => {
  let tempDir = '';
  let container = null;

  try {
    // currently only python support
    if (language !== 'python') {
      return {
        output: '',
        error: 'Unsupported language'
      };
    }

    // create isolated execution container
    container = await docker.createContainer({
      Image: 'code-executor-python',

      Tty: true,

      Cmd: ['sh', '-c', 'while true; do sleep 3600; done'],

      WorkingDir: '/app',

      HostConfig: {
        Memory: 256 * 1024 * 1024, // 256 MB
        NanoCPUs: 500000000, // 0.5 CPU
        PidsLimit: 64,
        NetworkMode: 'none',
        AutoRemove: false,
        ReadonlyRootfs: false
      }
    });

    // start container
    await container.start();

    // create unique temp folder
    const jobId = uuid();

    tempDir = path.join(process.cwd(), 'src/projects', `${roomId}-${jobId}`);

    fs.mkdirSync(tempDir, {
      recursive: true
    });

    // unique python filename
    const fileName = `${jobId}.py`;

    // create code file
    const codeFilePath = path.join(tempDir, fileName);

    fs.writeFileSync(codeFilePath, code);

    // create tar stream
    const tarStream = tar.pack(tempDir);

    // copy file into container
    await container.putArchive(tarStream, {
      path: '/app'
    });

    // create execution instance
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

    // stdout handler
    const stdoutStream = {
      write: async (chunk) => {
        output += chunk.toString();

        // output protection
        if (output.length > MAX_OUTPUT_SIZE) {
          try {
            await container.kill();
          } catch {
            console.log('error in output protection');
          }
        }
      }
    };

    // stderr handler
    const stderrStream = {
      write: async (chunk) => {
        errorOutput += chunk.toString();

        // output protection
        if (errorOutput.length > MAX_OUTPUT_SIZE) {
          try {
            await container.kill();
          } catch {
            console.log('error in output protection');
          }
        }
      }
    };

    // separate stdout/stderr
    container.modem.demuxStream(stream, stdoutStream, stderrStream);

    let timeoutId;

    // execution timeout protection
    await Promise.race([
      new Promise((resolve) => {
        stream.on('end', resolve);
      }),

      new Promise((_, reject) => {
        timeoutId = setTimeout(async () => {
          try {
            await container.kill();
          } catch {
            console.log('error while killing the container');
          }

          reject(new Error('Execution timeout'));
        }, EXECUTION_TIMEOUT);
      })
    ]);

    // clear timeout after successful execution
    clearTimeout(timeoutId);

    return {
      output,
      error: errorOutput
    };
  } catch (error) {
    return {
      output: '',
      error: error.message
    };
  } finally {
    // cleanup temp folder
    if (tempDir) {
      fs.rmSync(tempDir, {
        recursive: true,
        force: true
      });
    }
    if (container) {
      try {
        await container.remove({
          force: true
        });
      } catch {
        console.log('Error while cleaning the container');
      }
    }
  }
};
