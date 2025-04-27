import { OrderItem, Status, User } from "@prisma/client"

export class Order {
    id : number 
    user? : User
    email : string
    address : string
    status : Status
    products : OrderItem[]
    totalPrice : number
    createdAt : Date
}
