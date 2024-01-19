import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";


function App() {
  //trong arrow function dùng ngoặc đơn là mặc định return nhưng gì có trong ngoặc đơn 
      //Nếu dùng {} thì cần thêm return 

  const [products, setProducts] = useState<Product[]>([]);

  //Nếu ko thêm dependency sau khi dùng useEffect thì mỗi lần state được render, nó sẽ callback liên tục trên trang web 
  //Bên trong hàm useEffect dưới có câu lệnh để thêm vào state nên mỗi lần update cái mới nó sẽ liên tục gọi API
    //fetch giống như việc gửi và nhận request thông qua url 
    //data sau đó được đưa vào setProducts để hiển thị lên page 
  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then(Response => Response.json())
      .then(data => setProducts(data))
  }, []);

  function addProduct() {
    setProducts(prevState => [...prevState, 
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1), 
        description: "some description",
        price: (prevState.length * 100) + 100,
        pictureUrl: "some url",
        type: "some type",
        brand: "some brand",
        quantityInStock: prevState.length + 102,
      }]);
  }
  return (
    <div >
      <Typography variant="h4">
        Re-Store
      </Typography>
      
      <Catalog products = {products} addProduct = {addProduct}/>
      
    </div>
  );
}

export default App
