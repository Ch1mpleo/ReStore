import { Grid } from "@mui/material";
import { Product } from "../../App/models/product";
import ProductCard from "./ProductCard";

//Danh sách các product

interface Props {
    products: Product[];
}



export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={5}>
            {products.map(product => (
                <Grid item xs={3} key={product.id}>
                     <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}