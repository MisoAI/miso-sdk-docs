export async function getMisoClient() {
  return new Promise(resolve => (window.misocmd || (window.misocmd = [])).push(() => resolve(window.MisoClient)));
}
