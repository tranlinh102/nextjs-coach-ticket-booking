import { Vehicle } from './vehicle';

export interface Route {
  id: string;
  code: string;
  name: string;
  startStopId: string;
  endStopId: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  routeId: string;
  vehicleId: string;
  driver: string | null;
  scheduledDepartureTime: string;
  scheduledArrivalTime: string;
  actualDepartureTime: string | null;
  actualArrivalTime: string | null;
  price: number;
  status: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  route: Route;
}
