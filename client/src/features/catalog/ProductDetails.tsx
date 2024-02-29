import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../App/models/product";
import agent from "../../App/api/agent";
import NotFound from "../../App/errors/NotFound";
import LoadingComponent from "../../App/layout/LoadingComponent";


//Detail của riêng từng sản phẩm 
export default function ProductDetails() {
    //Cho id là string vì id lúc này nằm trên URL
    const {id} = useParams<{id: string}>();

    //Cho product có type là Product hoặc là null, và đặt giá trị khởi tạo là null 
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    //Khi đã sử dụng useEffect phải luôn thêm dependency ở cuối nếu ko nó sẽ lặp liên tục
    //Trong đây thì thêm id vì khi vào trang detail id sẽ ko thể thay đổi 
    //Dùng axios để GET data từ API
    useEffect(() => {
        //chỉ được execute khi id có value bên trong để tránh báo lỗi
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
            //dùng callback () để gọi lại useEffect khi chưa load được data
    }, [id])

    if (loading) return <LoadingComponent message="Loading product for you..."/>
    //
    if (!product) return <NotFound/>

    return(
        <Grid container spacing = {6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3" mb={2}> {product.name} </Typography>
                {/** Divider */}
                <Divider sx={{mb: 2}}/>
                {/** Chia tiền cho 100 xong lấy 2 số thập phân*/}
                <Typography variant="h4" color='secondary'> ${(product.price / 100).toFixed(2)} </Typography>
                
                <TableContainer>
                    <Table>
                        <TableBody>

                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

