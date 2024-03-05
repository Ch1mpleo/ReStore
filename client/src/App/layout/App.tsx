import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // Sử dụng state cho việc set dark mode on/off
  // cho giá trị trong state khởi tạo ban đầu là false 
  const [darkMode, setDarkMode] = useState(false);
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


  //Sau khi đã thêm react router vào thì ta phải sử dụng Outlet để load từ root của react 
  return (
    //ThemeProvider để add theme cho cả web, đọc description của nó
    <ThemeProvider theme={theme}>
      {/** Add toast noti */}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>

    </ThemeProvider>
  );
}

export default App
