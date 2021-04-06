  export interface UpdateUser {
    id: number;
    customerId: number;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    currentPassword?: string;
    newPassword?: string;
    email?:string;
  }