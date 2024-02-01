import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../App/models/product";


//Detail của riêng từng sản phẩm 
export default function ProductDetails() {
    const {id} = useParams<{id: string}>();

    //Cho product có type là Product hoặc là null, và đặt giá trị khởi tạo là null 
    const [product, setProducts] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    //Khi đã sử dụng useEffect phải luôn thêm dependency ở cuối nếu ko nó sẽ lặp liện tục
    //Trong đây thì thêm id vì khi vào trang detail id sẽ ko thể thay đổi 
    useEffect(() => {
        axios.get(`http:localhost:5000/api/products/${id}`)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
            //dùng callback () để gọi lại useEffect khi chưa load được data
    }, [id])

    if (loading) return <h3>Loading...</h3>
    if (!product) return <h3>Product not found</h3>

    return(
        <Typography variant="h2">
            {product.name}
        </Typography>
    )
}

