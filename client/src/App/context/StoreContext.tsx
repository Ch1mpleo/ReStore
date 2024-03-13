import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

//Use StoreContext to centralise state
interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => null;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

//Đây là 1 custom hook 
export function useStoreContext() {
    const context = useContext(StoreContext);
    if(context === undefined) {
        throw Error("Oops - we do not seem to be inside the provider")
    }
    return context;
}

//Hàm này để tạo ra 1 provider để wrap các component con
//Provider là 1 component cha, nó sẽ wrap các component con và truyền giá trị xuống cho các component con
export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;               //nếu ko có basket thì return luôn
        const items = [...basket.items];   //copy lại mảng items vào 1 biến items mới 
        const itemIndex = items.findIndex(i => i.productId === productId); 
        
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;  
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return {...prevState!, items}
                //copy lại prevState cũ và thay đổi items cũ thành items mới
                //dấu ! trong prevState! - là 1 dấu trong typescript để bảo đảm rằng prevState 
                    //ko bao giờ là null hoặc undefined
            })
        }
    }


    /*
    Trong React state ko nên bị thay đổi trực tiếp - giống như việc ta đóng gói 
      sử dụng tính đóng gói và dùng các setter để thay đổi nó - còn trong React thì 
      ta copy nó ra 1 mảng mới và thay đổi mảng mới đó - ko thay đổi trực tiếp mảng cũ

       - Do React sẽ re-rendering các components dựa vào sự thay đổi
            + Khi 1 State được update thì React sẽ so sánh giữa State mới và State cũ 
            để biết nên re-render ko 
       => Nên nếu ta thay đổi trực tiếp State thì React sẽ ko biết có sự cập nhật và ko
          re-render khi có thay đổi 
    */
}

export default StoreProvider;
