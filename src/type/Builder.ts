export interface BaseOption {
  readonly id: string;
  readonly name: string;
  readonly price: number; 
  readonly image: string; 
}

export interface SizeOption {
  readonly id: string;
  readonly name: string;
  readonly priceMultiplier: number;
}

export interface ExtraOption {
  readonly id: string;
  readonly name: string; 
  readonly price: number;
}