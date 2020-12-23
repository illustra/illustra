import Polygon, { PolygonData } from "./classes/Polygon/Polygon";

export default function createPolygon(polygonData: PolygonData): Polygon {

    // Create polygon
    const polygon: Polygon = new Polygon(polygonData);

    // Return created polygon
    return polygon;
}