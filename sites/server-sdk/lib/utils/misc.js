export function asArray(value) {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

export function removeExt(filename) {
  if (!filename) {
    return filename;
  }
  const i = filename.lastIndexOf('.');
  return i < 0 ? filename : filename.substring(0, i);
}
