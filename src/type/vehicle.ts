export interface Vehicle {
  id: string;
  licensePlate: string;
  seatCapacity: number;
  activeSeatCount: number;
  type: string;
  status: string;
  active: boolean;
}

export interface VehicleFormData {
  licensePlate: string;
  seatCapacity: number;
  activeSeatCount: number;
  type: string;
}