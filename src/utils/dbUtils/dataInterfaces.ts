type PackingType = 0 | 1 | 2;

// 0 is history
// 1 is fav
// 2 means to be deleted

export interface savedLuggageInterface {
  id?: number;
  userId: string;
  luggage1?: string;
  luggage2?: string;
  luggage3?: string;
  luggage4?: string;
}
export interface userInterface {
  userId?: string;
  Name: string;
  Surname: string;
  Email: string;
  Height?: number;
  Gender?: string;
  DateOfBirth: Date;
}

export interface userStyleInterface {
  id?: number;
  userId: string;
  brands: string;
  style: string;
}

export interface favClothesInterface {
  id?: number;
  userId: string;
  Item?: string;
}

export interface favPackingInterface {
  id?: number;
  Name: string;
  Luggage_1: string;
  Luggage_2?: string;
  Luggage_3?: string;
  Luggage_4?: string;
  userId: string;
  packing_type: PackingType;
}
