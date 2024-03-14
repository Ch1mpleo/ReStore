import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  
  //Sử dụng custom hook đã tạo ra từ StoreContext
  //Tại sao lại có dấu {} ở đây - vì khi export 1 object từ 1 file thì ta phải dùng dấu {} để lấy giá trị từ object đó
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
          .then(basket => setBasket(basket))
          .catch(err => console.log(err))
          .finally(() => setLoading(false))
    } else {
      //Nếu ko tìm ra buyerId thì ta cũng phải setLoading thành false để nó ko loading mãi
      setLoading(false);  
    }
  }, [setBasket])

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

  if (loading) return <LoadingComponent message="Initialising app..."/>

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
