export type Group = {
  id: string;
  clientId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TGroupList = Group & {
  numOfPeople: number;
  numOfExpenses: number;
  totalAmount: number;
  isSettled: boolean;
  notSettledAmount: number;
};
