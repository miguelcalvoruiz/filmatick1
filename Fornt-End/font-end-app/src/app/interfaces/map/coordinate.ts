export interface Coordinate{
    latitude: number;
    longitude: number;
}

export interface CoordinateWithMessage extends Coordinate{
    message: string;
}