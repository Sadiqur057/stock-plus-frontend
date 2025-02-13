export type TInvoiceOverviewData = {
  name: string;
  total_invoice_created: number;
  total_invoice_amount: number;
};

export type TPaymentOverviewData = {
  month: string;
  paid_amount: number;
  due_amount: number;
};

export type TRevenueOverviewData = {
  month: string;
  cost: number;
  revenue: number;
};