export interface CreditCard{
    id?:number;
    customerId:number;
    nameSurname:string;
    cardNumber:string;
    cardCvv:string;
    money:number;
    endDateMonth:string;
    endDateYear:string;
}