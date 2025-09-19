import {getCoordinateFromPostcode} from './postcodeService';
import { getStopPointsFromCoordinate, fetchArrivals } from './tflService';
import type { StopPoint } from './types/StopPoint';
import type { StopArrivals } from './types/StopArrivals';
import type { Coordinate } from './types/Coordinate';

export async function getNearestStopPointsFromPostcode(postcode: string, numberOfStops: number) : Promise<StopPoint[] | null> {
    const coordinate: Coordinate | null = await getCoordinateFromPostcode(postcode);
    const stopPoints = coordinate ? await getStopPointsFromCoordinate(coordinate) : null;
    if (!stopPoints) {
        return null;
    }
    return stopPoints.slice(0, numberOfStops);
}

export async function getStopArrivalsFromStopPoints(stopPoints: StopPoint[]) : Promise<StopArrivals[]> {
    const stopIds = stopPoints.map(sp => sp.id);
    const stopArrivals : StopArrivals[] = await Promise.all(stopIds.map(async id => ({stopId : id, arrivals: (await fetchArrivals(id)) ?? []}) as StopArrivals));
    return stopArrivals;
}

export function sortAndSliceArrivals(arrivals: StopArrivals[], numberOfArrivals: number) : StopArrivals[] {
    return arrivals.map(sa => ({
        stopId: sa.stopId,
        arrivals: sa.arrivals.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, numberOfArrivals)
    } as StopArrivals));
}
