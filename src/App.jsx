
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import Home from './Components/home/Home.jsx';
const About = lazy(()=> import ('./Components/about/About.jsx'));
const Services = lazy(()=> import ('./Components/services/Services.jsx'));
const Register = lazy(()=> import ('./Components/auth/Register'));
const Login = lazy(()=> import ('./Components/auth/Login'));
const Logout = lazy(() => import ('./Components/auth/Logout'));
import Cart from './Components/cart/Cart.jsx';
import Product from './Components/product/Product.jsx';
const ProductItemPage = lazy(()=> import ('./Components/productItem/ProductItemPage'));
import RandomBook from './Components/random-book/Random-book.jsx';
const OrderPage = lazy(()=> import ('./Components/Account/order/OrderPage.jsx'));
const OrderItemPage = lazy(() => import ('./Components/Account/orderItem/OrderItemPage.jsx'));
const ModifyProfilePage = lazy(() => import ('./Components/Account/modify-profile/ModifyProfilePage.jsx'))
const LostPssword = lazy(() => import ('./Components/auth/LostPassword.jsx'));
const CreateProduct = lazy (() => import ('./Components/productControl/createProducts.jsx'));
const WishList = lazy (() => import ('./Components/wishList/wishList.jsx'));
const ProductController = lazy (() => import ('./Components/productControl/productController.jsx'))
const ProductEdit = lazy(() => import ('./Components/productControl/productEdit.jsx'))
const OrderControl = lazy (() => import ('./Components/orderControl/OrderControl.jsx'))
import Feedback from './Components/feedback/feedback.jsx';
const FeedbackControl = lazy(() => import ('./Components/feedback/feedback-staff/FeedbackControl.jsx'));
const FeedbackDetail = lazy(() => import ('./Components/feedback/feedback-staff/FeedbackDetail.jsx'));
import { CartObject } from './utility/CartObject.jsx';
import { ProductObject } from './utility/ProductsObject.jsx';
import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';
import ScrollToTop from 'react-scroll-to-top';

function App() {

    return (
        <>
        <ProductObject>
            <CartObject>  
                <Router>
                    <Header />
                    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
                        <Route path="/services" element={<Suspense fallback={<div>Loading...</div>}><Services /></Suspense>} />
                        <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
                        <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
                        <Route path="/logout" element={<Suspense fallback={<div>Loading...</div>}><Logout /></Suspense>} />
                        <Route path="/lost-password" element={<Suspense fallback={<div>Loading...</div>}><LostPssword /></Suspense>} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/:ProductID" element={<Suspense fallback={<div>Loading...</div>}><ProductItemPage /></Suspense>} />
                        <Route path="/orders" element={<Suspense fallback={<div>Loading...</div>}><OrderPage /></Suspense>} />
                        <Route path="/orders/:OrderID" element={<Suspense fallback={<div>Loading...</div>}><OrderItemPage /></Suspense>} />
                        <Route path="/account/edit-account" element={<Suspense fallback={<div>Loading...</div>}><ModifyProfilePage /></Suspense>} />
                        <Route path="/staff/create-products" element={<Suspense fallback={<div>Loading...</div>}><CreateProduct /></Suspense>} />
                        <Route path="/staff/products-controll" element={<Suspense fallback={<div>Loading...</div>}><ProductController /></Suspense>} />
                        <Route path="/staff/products-edit/:ProductID" element={<Suspense fallback={<div>Loading...</div>}><ProductEdit /></Suspense>} />
                        <Route path="/staff/order-control" element={<Suspense fallback={<div>Loading...</div>}><OrderControl /></Suspense>} />
                        <Route path="/random" element={<Suspense fallback={<div>Loading...</div>}><RandomBook /></Suspense>} />
                        <Route path="/wish-list" element={<Suspense fallback={<div>Loading...</div>}><WishList /></Suspense>} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/staff/feedbacks-control" element={<Suspense fallback={<div>Loading...</div>}><FeedbackControl /></Suspense>} />
                        <Route path="/staff/feedbacks-control/:FeedbackID" element={<Suspense fallback={<div>Loading...</div>}><FeedbackDetail /></Suspense>} />


                        <Route path="*" element={<Home />} />
                    </Routes>
                    <ScrollToTop smooth />
                    </ErrorBoundary>
                    <Footer />
                   
                </Router>
            </CartObject>
        </ProductObject>
        </>
    );
}

export default App;