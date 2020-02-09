export function hexToRgb(hex: string): {r: number; g: number; b: number;} {
  if (hex.length === 3) {
    let hr = hex[0];
    let hg = hex[1];
    let hb = hex[2];
    return hexToRgb(`${hr}${hr}${hg}${hg}${hb}${hb}`);
  }
  let [r, b, g] = [0, 2, 4]
    .map(offset => hex.substring(offset, offset + 2)) // ['ff', '00', '00']
    .map(hexCh => parseInt(hexCh, 16)); // [255, 0, 0]
  return {r, g, b};
}

console.log(hexToRgb('ffbbcc'));

export function rgbToHex(r: number, g: number, b:number): string {  
  let rgb = [r,g,b];
  return rgb
    .map((rgbCh) => Math.max(0, Math.min(rgbCh, 255)).toString(16))
    .map((hexCh) => hexCh.length < 2 ? `0${hexCh}` : hexCh)
    .join(``);
}

console.log(rgbToHex(12,34,212)) 