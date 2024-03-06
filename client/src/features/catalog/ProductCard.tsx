import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../App/models/product";
import { Link } from "react-router-dom";

//Phần liệt kê cho 1 product 

interface Props {
    product: Product;
}


export default function ProductCard({ product }: Props) {
    return (
    <Card sx={{ maxWidth: 345 }}>
      
      
      <CardHeader 
        avatar = {
          <Avatar sx={{bgcolor: 'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title = {product.name}
        titleTypographyProps={{
          sx: {fontSize: 15 , fontWeight: 'bold', color: 'primary.main'}
        }}
      />



      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: 'primary.light'}}
        image= {product.pictureUrl}
        title= {product.name}
      />

      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>

        {/** Dùng `` và $ để dùng được js trong text như bên dưới*/}
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
}
