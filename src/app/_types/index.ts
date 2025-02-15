type Item = {
  quantity: number;
  rate: number;
  tax: string;
  amount: number;
};

type ProfileData = {
  name: string;
  email: string;
  role: string;
  emp_id: string;
  departments: string;
  designation: string;
  company_name: string;
};

enum amountValEnum {
  Flat = 1,
  Pool = 2,
  Percentage = 3,
}
enum PaymentStatusEnum {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
  Paid = 4,
  Deferred = 5,
}
export { amountValEnum, PaymentStatusEnum };

export type { Item, ProfileData };
