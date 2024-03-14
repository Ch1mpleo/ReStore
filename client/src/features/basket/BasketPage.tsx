import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../App/context/StoreContext";
import { useState } from "react";
import agent from "../../App/api/agent";
import { LoadingButton } from "@mui/lab";

export default function BasketPage() {

  /* 
    Thay vì sử dụng useState và useEffect như thông thường để lấy giá trị từ StoreContext 
    -> bây giờ thì ta sử dụng custom hook đã tạo ra từ StoreContext 
  */
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
         .then(basket => setBasket(basket))
         .catch(error => console.log(error))
         .finally(() => setLoading(false));
  }

  
  function handleRemoveItem(productId: number, quantity = 1) {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
         .then(() => removeItem(productId, quantity))
         .catch(error => console.log(error))
         .finally(() => setLoading(false))
  }


  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        {/** Table Head */}
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        {/** Table Body */}
        <TableBody>
          {basket.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display={"flex"} alignItems={"center"}>
                  <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }}></img>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="center">${((item.price) / 100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId)} color="primary">
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={loading} onClick={() => handleAddItem(item.productId)} color="primary">
                  <Add/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">${(((item.price) / 100) * item.quantity).toFixed(2)}</TableCell>

              {/** Icon delete */}
              <TableCell align="right">
                <LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId, item.quantity)} color="error">
                  <Delete />
                </LoadingButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
