//truyền product thông qua hàm được gọi bên file kia, khi qua đây ta chỉ cần khai
//báo theo dạng any để có thể dùng nhiều kiểu data types khác nhau 
//khi khai báo xong props ta chỉ cần dùng lại các attribute cũ đã được truyền 
//vào props

//Vì đã khai báo kiểu any nên có những lỗi mà sẽ ko được thông báo 
//vd: nếu addProduct chưa được truyền vào bên kia thì nút button đây sẽ ko hoạt
//động, mặc dù ko thông báo lỗi 

//Vì vậy sử dụng any ko phù hợp => nên sử dụng interface, sẽ dễ check lỗi và sửa
import { useEffect, useState } from "react";
import { Product } from "../../App/models/product"
import ProductList from "./ProductList";



//Nếu ko muốn sử dụng props mọi nơi trong code, ta có thể dùng dấu {}
//export default function Catalog(props: Props) 
//Ta có thể gọi hẳn biến bên trong mà ko cần thông qua 1 từ khác
//Kỹ thuật gọi là: Destructuring
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        fetch("http://localhost:5000/api/Products")
            .then(Response => Response.json())
            .then(data => setProducts(data))
    }, []);

    return (
        <>
            <ProductList products={products} />
        </>
    )
}
