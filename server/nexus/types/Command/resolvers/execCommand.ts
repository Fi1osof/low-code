/* eslint-disable no-console */
import { FieldResolver } from 'nexus'
import { spawn } from 'child_process'

export const execCommand: FieldResolver<'Mutation', 'execCommand'> = async (
  _,
  args
) => {
  const cmd = args.cmd

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args.args || [], {
      cwd: args.cwd || undefined,
      // serialization: "advanced",
      shell: true,
    })

    console.log('child', child)

    let stdout: string | undefined
    let stderr: string | undefined

    child.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`)

      stdout = data.toString()
    })

    child.stderr.on('data', (data) => {
      console.log(`child stderr:\n${data}`)

      stderr = data.toString()
    })

    child.on('error', (data) => {
      reject(data)
    })

    child.on('exit', (code, signal) => {
      //

      resolve({
        code,
        signal,
        stdout: stdout ? JSON.parse(stdout) : undefined,
        stderr,
      })
    })
  })

  // return new Promise((resolve, reject) => {

  //   exec(cmd, {
  //     maxBuffer: 1024 * 500,
  //     cwd: args.cwd || undefined,
  //   }, (error, stdout, stderr) => {

  //     // console.log('error', error);
  //     console.log('stdout', stdout);
  //     console.log('stderr', stderr);

  //     if (error) {
  //       // console.warn(error);

  //       return reject(error);
  //     }
  //     // else if (stdout) {
  //     //   console.log(stdout);
  //     // }
  //     // else {
  //     //   console.log(stderr);
  //     // }
  //     resolve({ stdout, stderr, });
  //   });
  // });
}
