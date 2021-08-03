export function tag(name: string, attrs: [string, string | number][], contents = ''){
  const attributes = attrs.map(a => `${a[0]}="${a[1]}"`);
  return `<${name} ${attributes}>${contents}</${name}>`
}
