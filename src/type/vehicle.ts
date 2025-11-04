export interface Vehicle {
  id: string;
  licensePlate: string;
  seatCapacity: number;
  type: "Ghế" | "Giường" | "Limousine";
  status: "Hoạt động" | "Không hoạt động" | "Bảo trì";
  active: boolean;
}