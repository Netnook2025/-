
export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  currentAmount: number;
  bankAccount: BankAccount;
}
