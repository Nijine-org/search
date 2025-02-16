type Token = {
  id: string;
  name: string;
  token: string;
  status: string;
};

type TokenFormData = Pick<Token, 'name' | 'token'>;
type KeyResult = {
  status: number;
  message: string;
  data: Token[];
};

export type { Token, KeyResult, TokenFormData };
