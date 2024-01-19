//truyền product thông qua hàm được gọi bên file kia, khi qua đây ta chỉ cần khai
    //báo theo dạng any để có thể dùng nhiều kiểu data types khác nhau 
    //khi khai báo xong props ta chỉ cần dùng lại các attribute cũ đã được truyền 
    //vào props

//Vì đã khai báo kiểu any nên có những lỗi mà sẽ ko được thông báo 
    //vd: nếu addProduct chưa được truyền vào bên kia thì nút button đây sẽ ko hoạt
    //động, mặc dù ko thông báo lỗi 

//Vì vậy sử dụng any ko phù hợp => nên sử dụng interface, sẽ dễ check lỗi và sửa
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../App/models/product"


interface Props {
    products: Product[];
    addProduct: () => void;
}

//Nếu ko muốn sử dụng props mọi nơi trong code, ta có thể dùng dấu {}
    //export default function Catalog(props: Props) 
    //Ta có thể gọi hẳn biến bên trong mà ko cần thông qua 1 từ khác
    //Kỹ thuật gọi là: Destructuring
export default function Catalog({products, addProduct}: Props) {
    return(
        <>
            <List>
                {products.map((Product) => (
                <ListItem key={Product.id}>
                    <ListItemAvatar>
                        <Avatar src={Product.pictureUrl}/>
                    </ListItemAvatar>
                    <ListItemText>
                        {Product.name} - {Product.description} - {Product.price}
                    </ListItemText>
                </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={addProduct}>Add product</Button>
        </>
    )
}