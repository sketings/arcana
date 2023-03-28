export function Freeze(constructor: any) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}
