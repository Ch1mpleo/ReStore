import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";


//Tạo 1 array chứa những router sẽ dẫn đến những page khác
const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'Test', path: '/test-error' },
    { title: 'Contact', path: '/contact' }
]
const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
]

//Tách phần navStyle này thành 1 object containing styles
const navStyle = {
    color: 'inherit',
    Typography: "h4",
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            {/** Toolbar là parent của 5 thằng child bên dưới nên ta sẽ dùng flexbox ở đây */}
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >

                {/** Trong box có thể sử dụng các thuộc tính thông thường mà ko cần sx */}

                {/** Chứa logo restore và switch chuyển dark mode  */}
                <Box display={"flex"} alignItems={"center"}>
                    <Typography
                        variant="h5"
                        component={NavLink}
                        to='/'
                        sx={navStyle}
                    >
                        RE - STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>


                {/** Chứa catalog, about, contact */}
                <Box>
                    <List sx={{ display: 'flex' }}>
                        {/* Dùng map để loop qua mảng midLinks đã khai báo trên */}
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>

                 {/** Chứa logo cart, login, register */}
                <Box display={"flex"} alignItems={"center"}>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent='4' color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>


            </Toolbar>
        </AppBar>

    )
}