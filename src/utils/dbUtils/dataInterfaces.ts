type PackingType = 0 | 1 | 2 | 3;

// 0 is history
// 1 is fav
// 2 is both
// 3 means to be deleted
export interface userInterface {
  userId: string;
  Name: string;
  Surname: string;
  Email: string;
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
