export type Product = {
  _id: string;
  productName: string;
  company: string;
  salePrice: number;
  purchasePrice?: number;
  quantity: number;
};

export type Customer = {
  _id: string
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type CostSummary = {
  subtotal: number;
  total: number;
  tax: number;
  total_paid: number;
  total_due: number;
  status: string;
  revenue: number;
  revenue_percentage: number;
};

export type Invoice = {
  _id: string;
  company: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  customer: Customer;
  products: Product[];
  created_by: string;
  user_email: string;
  total_cost: CostSummary;
  created_at: string;
};


export type TDate = {
  startDate: string,
  endDate: string
}

export type TDuration = {
  label: string,
  value: string
}