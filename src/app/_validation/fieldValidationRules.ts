import { string, number, boolean, array, object } from 'yup';

const validationRules = {
  id: string().typeError('Please provide a valid id.'),
  name: string()
    .required('Please provide a name')
    .typeError('Please provide a valid name.'),
  account_name: string()
    .nullable()
    .typeError('Please provide a valid account name.'), // existing
  bank_account_holder_name: string()
    .nullable()
    .typeError('Please provide a valid bank account holder name.'), // existing
  bank_name: string().nullable().typeError('Please provide a valid bank name.'), // existing
  bank_account_no: number()
    .nullable()
    .typeError('Please provide a valid bank account number.'), // existing
  bank_ifsc: string().nullable().typeError('Please provide a valid IFSC code.'), // existing
  bank_branch_address: string()
    .nullable()
    .typeError('Please provide a valid bank branch address.'), // existing
  bill_no: number().nullable().typeError('Please provide a valid bill number.'),
  card_holder_name: string()
    .nullable()
    .typeError('Please provide a valid cardholder name.'), // existing
  card_provider_bank_name: string()
    .nullable()
    .typeError('Please provide a valid card provider bank name.'), // existing
  card_no: number().nullable().typeError('Please provide a valid card number.'), // existing
  exp_date: array()
    .nullable()
    .typeError('Please provide a valid expiration date.'), // existing

  cvv: number().nullable().typeError('Please provide a valid CVV.'), // existing
  description: string()
    .nullable()
    .typeError('Please provide a valid description.'), // existing
  default_status: boolean().nullable(), // existing
  contact_details: string().nullable(), // existing
  contact_salutation: string().nullable().oneOf(['Mr.', 'Mrs.', 'Miss', 'Dr']), // existing
  contact_first_name: string()
    .nullable()
    .typeError('Please provide a valid first name.'), // existing
  contact_last_name: string()
    .nullable()
    .typeError('Please provide a valid last name.'), // existingexpense_type
  contact_email: string()
    .nullable()
    .email('Invalid email format')
    .typeError('Please provide a valid email.'), // existing
  display_name: string()
    .nullable()
    .typeError('Please provide a valid display name.'),
  work_phone: string()
    .nullable()
    .matches(/^\d+$/, 'Work phone must be numeric')
    .typeError('Please provide a valid work phone.'), // existing
  mobile_number: string()
    .nullable()
    .matches(/^\d+$/, 'Mobile number must be numeric')
    .typeError('Please provide a valid mobile number.'), // existing
  account_holder_name: string()
    .nullable()
    .typeError('Please provide a valid account holder name.'), // existing
  account_number: string()
    .nullable()
    .matches(/^\d+$/, 'Account number must be numeric')
    .typeError('Please provide a valid account number.'), // new
  ifsc: string().nullable().typeError('Please provide a valid IFSC code.'), // new
  salutation: string().nullable().oneOf(['Mr.', 'Mrs.', 'Miss', 'Dr']), // new
  company_name: string().nullable(), // new
  expense_type: string().nullable(), // new
  portal_language: string().nullable(), // new
  enable_port: boolean().nullable(), // new
  personal_phone: string()
    .nullable()
    .matches(/^\d+$/, 'Mobile number must be numeric'), // new
  gst_treatment_id: string().nullable().required('GST treatment is required'), // new
  source_of_supply: string()
    .nullable()
    .required('Source of supply is required'), // new
  pan: string()
    .nullable()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Invalid PAN format'), // new
  gst_registered: boolean().nullable(), // new
  gst_number: string()
    .nullable()
    .when('gst_registered', {
      is: true,
      then: (schema) =>
        schema.matches(
          /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z\d{1}$/,
          'Invalid GST number format',
        ),
      otherwise: (schema) => schema.nullable(),
    }), // new
  currency: string().nullable(), // new
  opening_balance: number()
    .nullable()
    .min(0, 'Opening balance must be non-negative'), // new
  exchange_rate: number()
    .nullable()
    .min(0, 'Exchange rate must be non-negative'), // new
  payment_term_id: string().nullable(), // new
  tds: string().nullable(), // new
  website_url: string().nullable().url('Invalid URL format'), // new
  department: string().nullable(), // new
  designation: string().nullable(),
  vendor_id: number().nullable(), // new
  bill_attention: string().nullable(), // new
  bill_address: string().nullable(), // new
  bill_country: string().nullable(), // new
  bill_state: string().nullable(), // new
  bill_city: string().nullable(), // new
  bill_pin_code: string()
    .nullable()
    .matches(/^\d{6}$/, 'Invalid PIN code format'), // new
  bill_phone: string()
    .nullable()
    .matches(/^\d+$/, 'Bill phone must be numeric'), // new
  bill_fax_number: string()
    .nullable()
    .matches(/^\d+$/, 'Bill fax number must be numeric'), // new
  ship_attention: string().nullable(), // new
  ship_address: string().nullable(), // new
  ship_country: string().nullable(), // new
  ship_state: string().nullable(), // new
  ship_city: string().nullable(), // new
  ship_pin_code: string()
    .nullable()
    .matches(/^\d{6}$/, 'Invalid PIN code format'), // new
  ship_phone: string()
    .nullable()
    .matches(/^\d+$/, 'Ship phone must be numeric'), // new
  ship_fax_number: string()
    .nullable()
    .matches(/^\d+$/, 'Ship fax number must be numeric'), // new
  //   contacts: array().of(contactDetailsSchema).nullable(), // new
  //   bankdetails: array().of(bankDetailsSchema).nullable(), // new
  customer_id: string()
    .nullable()
    .required('Customer name is required')
    .typeError('Please provide a valid customer name.'), // existing
  quote_number: string()
    .nullable()
    .matches(/^\d+$/, 'Quote number must be numeric'), // new
  quote_date: array().typeError('Please provide a valid quote date.'), // existing
  sub_total: string().matches(/^\d+$/, 'Sub total must be numeric'), // new
  subject: string().nullable().typeError('Please provide a valid subject.'), // existing
  discount: string().matches(/^\d+$/, 'Discount must be numeric'), // new
  shipping_charges: string()
    .nullable()
    .matches(/^\d+$/, 'Shipping Charges must be numeric'), // new
  round_off: string().nullable(),
  amount: string().matches(/^\d+$/, 'Amount must be numeric'), // new
  status: boolean().nullable(),
  balance_due: number()
    .nullable()
    .typeError('Please provide a valid balance due.'), // new
  due_date: string().nullable().typeError('Please provide a valid due date.'), // new
  date: string().nullable().typeError('Please provide a valid date.'), // new
  item_id: string().nullable().typeError('Please provide a valid item .'),
  account_id: string().nullable().typeError('Please provide a valid account .'),
  quantity: string().matches(/^\d+$/, 'Quantity must be numeric'), // new
  tax_id: string().nullable().typeError('Please provide a valid tax .'),
  rate: number().nullable().typeError('Please provide a valid rate.'), // new
  // customer_id: string()
  //   .nullable()
  //   .typeError('Please provide a valid customer .'),
  invoice_date: string()
    .nullable()
    .typeError('Please provide a valid invoice date.'),
  invoice_number: string()
    .required('Invoice number is required')
    .matches(/^[A-Za-z0-9-]+$/, 'Invoice number must be alphanumeric'),
  order_date: string()
    .nullable()
    .typeError('Please provide a valid order date.'),
  expected_shipmentdate: string()
    .nullable()
    .typeError('Please provide a valid invoice date.'),
  order_number: string()
    .required('Order number is required')
    .matches(/^[A-Za-z0-9-]+$/, 'Order number must be alphanumeric'),
  payment_terms_id: string()
    .nullable()
    .typeError('Please select a valid payment terms .'),

  salesperson_id: string()
    .nullable()
    .typeError('Please provide a valid sales person .'),
  delivery_method: string()
    .nullable()
    .typeError('Please provide a valid delivery method .'),
  vendor_name: string()
    .nullable()
    .required('Vendor name is required')
    .typeError('Please provide a valid vendor name.'),
  payments_made: string()
    .nullable()
    .matches(/^\d+$/, 'Payment made must be numeric'),
  Payment_mode: string().nullable(),
  paid_through: string().nullable(), // new
  payment_ref: string().nullable(), // new
  amount_received: string().matches(/^\d+$/, 'Amount received must be numeric'), // new
  bank_charges: string().matches(/^\d+$/, 'Bank charges must be numeric'), // new
  payment_date: string().nullable().typeError('Please provide a valid date.'), // new
  payment_mode: string().nullable(),
  deposit_to: string().nullable(),
  payment_reference: string().nullable(),
  tds_tax_account: string().nullable(),
  tax_deducted: string().matches(/^\d+$/, 'Tax deducted must be numeric'), // new
  purchase_subject: string().nullable(),
  place_of_supply: string().nullable().required('Place of supply is required'), // new
  description_supply: string()
    .nullable()
    .required('Description of supply is required'), // new
  tax: string().nullable(),
  notes: string().nullable().typeError('Please provide a valid notes.'),
};

const contactDetailsSchema = object({
  contacts_details: validationRules.contact_details,
  contact_salutation: validationRules.contact_salutation,
  contact_first_name: validationRules.contact_first_name,
  contact_last_name: validationRules.contact_last_name,
  contact_email: validationRules.contact_email,
  work_phone: validationRules.work_phone,
  mobile_number: validationRules.mobile_number,
});

const bankDetailsSchema = object({
  account_holder_name: validationRules.account_holder_name,
  bank_name: validationRules.bank_name,
  account_number: validationRules.account_number,
  ifsc: validationRules.ifsc,
});

const billItems = object({
  item_id: validationRules.item_id,
  account_id: validationRules.account_id,
  quantity: validationRules.quantity,
  rate: validationRules.rate,
  tax: validationRules.tax_id,
  amount: validationRules.amount,
  customer_id: validationRules.customer_id,
});

const invoiceItems = object({
  item_id: validationRules.item_id,
  quantity: validationRules.quantity,
  rate: validationRules.rate,
  tax: validationRules.tax_id,
  amount: validationRules.amount,
});

const QuotesItems = object({
  item_id: validationRules.item_id,
  account_id: validationRules.account_id,
  quantity: validationRules.quantity,
  rate: validationRules.rate,
  tax: validationRules.tax_id,
  amount: validationRules.amount,
});

const salesorderItems = object({
  item_id: validationRules.item_id,
  quantity: validationRules.quantity,
  rate: validationRules.rate,
  tax: validationRules.tax_id,
  amount: validationRules.amount,
});
export {
  validationRules,
  contactDetailsSchema,
  bankDetailsSchema,
  billItems,
  invoiceItems,
  QuotesItems,
  salesorderItems,
};
