type Key = {
  id: string;
  name: string;
  token: string;
  status: string;
};
type KeyResult = {
  status: number;
  message: string;
  data: Key[];
};

export type { Key, KeyResult };
