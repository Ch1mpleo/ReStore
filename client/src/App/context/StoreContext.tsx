import { createContext, useContext } from "react";
import { Basket } from "../models/basket";

//Use StoreContext to centralise state
interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => null;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);
    if(context === undefined) {
        throw Error("Oops - we do not seem to be inside the provider")
    }
    return context;
}
