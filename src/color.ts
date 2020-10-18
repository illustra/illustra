import color from "color";

interface RGBA {
    r: number;
    g: number;
    b: number;
    alpha?: number;
}

export type Color = string | number | RGBA;

export function parseColor(input: Color): string {

    // Return
    return color(input).hex();
}