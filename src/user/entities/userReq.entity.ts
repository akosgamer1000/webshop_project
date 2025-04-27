export class UserReq{
    user: {
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
            cart: {
                product: {
                    id: number;
                    name: string;
                    price: number;
                };
                quantity: number;
            }[];
            token: {
                token: string;
            };
            orders: {
                id: number;
                total: number;
                products: {
                    id: number;
                    name: string;
                    price: number;
                }[];
            }[];
        }
    }
}