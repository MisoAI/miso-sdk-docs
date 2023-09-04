import { exec as _exec } from 'child_process';
import { constants } from 'fs';
import { access } from 'fs/promises';

export async function exec(cmd, options) {
  return new Promise((resolve, reject) => {
    _exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr }); // TODO
      }
    });
  });
}

export async function fileExists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}
