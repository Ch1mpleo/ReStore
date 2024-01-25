import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

// mb = margin (mb: 4 tuong duong 43 pixels)

interface  Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props) {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h4">RE - STORE</Typography>
                <Switch checked = {darkMode} onChange={handleThemeChange}/>
            </Toolbar>
        </AppBar>
        
    )
}