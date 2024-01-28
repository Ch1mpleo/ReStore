import { createBrowserRouter } from "react-router-dom";
import App from "../App/layout/App";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/Catalog";
import ContactPage from "../features/contact/ContactPage";
import AboutPage from "../features/about/AboutPage";
import ProductDetails from "../features/catalog/ProductDetails";


// React router là đường dẫn nối đến các page khác, kết nối nhiều page đơn lẻ lại
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails/>},
            {path: 'contact', element: <ContactPage/>},
            {path: 'about', element: <AboutPage/>},
        ]
    }
])