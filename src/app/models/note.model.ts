export interface Item {
  name: string;
  price: number;
}

export interface Note {
  id: number;
  title: string;
  items: Item[];
}
