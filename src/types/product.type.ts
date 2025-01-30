export interface ProductShape {
  _id?: string;
  productName?: string;
  company?: string;
  quantity?: number;
  purchasePrice?: string;
  salePrice?: string;
  remarks?: string;
  attributes?: attributes[];
}

type attributes = {
  key?: string;
  value?: string;
};
