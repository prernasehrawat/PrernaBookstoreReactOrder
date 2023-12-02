import {ShoppingCartItem, BookItem} from "../types";
import {stat} from "fs";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};
type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            const existingCartIndex: number = state.findIndex(
                (cartItem: ShoppingCartItem): boolean => cartItem.id === action.id);
            if(existingCartIndex !== -1){
                const updatedState = [...state];
                updatedState[existingCartIndex].quantity +=1;
                return updatedState;
            }
            else {
                return [
                    ...state,
                    {id: action.id, book: action.item, quantity: 1},
                ];
            }
        case CartTypes.REMOVE:
            let updatedCartItems = state.map((book) => {
                if (book.id === action.item.bookId) {
                    let updatedQuantity = book.quantity - 1;

                    if (updatedQuantity === 0) {
                        // If quantity becomes zero, exclude the item from the cartß
                        return null;
                    }
                    return { ...book, quantity: updatedQuantity };
                }
                return book;
            });
            updatedCartItems = updatedCartItems.filter((book) => book !== null);
            return updatedCartItems;

//         case CartTypes.REMOVE:
//             let quantity = -1;
//             if (existingCartIndex(state, action.item.bookId)){
//                 let cartItem = state.map((book:)): =>{
//                     if (book.id === action.item.bookId){
//                         quantity = book.quantity -1;
//                         return {...book, quantity:quantity};
//                     }
//                     return book;
//                 });
// if (quantity===0){
//     cartItem = state.filter((book:)) => book.id !== action.item.bookId);
// }
//             }
//             return cartItem;

        case CartTypes.CLEAR:
            return [] ;    // will be defined in Project 7
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};
