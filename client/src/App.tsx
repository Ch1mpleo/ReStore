import { useEffect, useState } from "react"


function App() {
  //trong arrow function dùng ngoặc đơn là mặc định return nhưng gì có trong ngoặc đơn 
      //Nếu dùng {} thì cần thêm return 

  const [products, setProducts] = useState([
    {name: "product1", price: 100.00},
    {name: "product2", price: 200.00},
  ]);

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
    setProducts(prevState => [...prevState, {name: "product" + (prevState.length + 1), price: (prevState.length * 100) + 100}]);
  }
  return (
    <div className='app'>
      <h1 style={{color: 'red'}}>
        Re-Store
      </h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default App
