import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";


function App() {

  // Sử dụng state cho việc set dark mode on/off
  // cho giá trị trong state khởi tạo ban đầu là false 
  const[darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? 'dark' : 'light';
  //Tạo dark mode cho web
  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: palletteType === 'light' ? '#eaeaea' : "#121212"
      }
    }
  })
  
  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>  
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Catalog />
      </Container>
    
      
    </ThemeProvider>
  );
}

export default App
