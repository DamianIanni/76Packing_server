type PackingType = 0 | 1 | 2;

export interface userInterface {
  userId: string;
  name: string;
  surname: string;
  email: string;
}

export interface favClothesInterface {
  id: number;
  userId: string;
  Item: string;
}

export interface favPackingInterface {
  id: number;
  Name: string;
  Luggage_1: string;
  Luggage_2?: string;
  Luggage_3?: string;
  Luggage_4?: string;
  userId: string;
  packing_type: PackingType;
}
