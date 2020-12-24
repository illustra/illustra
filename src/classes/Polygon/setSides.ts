import { Polygon } from "../../internal";

export default function setSides(polygon: Polygon, sides: number): Polygon {

    // Debug
    polygon._debug(`Setting sides to ${sides}`);

    // Invalid sides
    if (sides < 0) throw new Error("Sides can't be less than 0");

    // Set sides
    polygon.sides = sides;

    // Return
    return polygon;
}