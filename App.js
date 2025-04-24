import './App.css';
import Login from './components/Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Pages/Dashboard';
import UnAuthorized from './components/Pages/UnAuthorized';
import Home from './components/Pages/Home';
import UsersList from './components/Pages/Administrator/UsersList';
import PostsList from './components/Pages/Administrator/PostsList';
import SinglePost from './components/Pages/Administrator/SinglePost';
import AddPost from './components/Pages/Administrator/AddPost';
import Blog from './components/Pages/Blog';
import UpdateUser from './components/Pages/Administrator/UpdateUser';
import ContactUs from './components/Pages/ContactUs';
import Products from './components/Pages/Products';
import CartProvider from './CartProvider';
import Cart from './components/Pages/Cart';
import MainLayout from './MainLayout';
import Checkout from './components/Pages/Checkout';

function App() {
  return (
    <>
    <CartProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path='/contact-us' element={<ContactUs />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={["administrator","subscriber"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/users" element={
            <ProtectedRoute allowedRoles={["administrator"]}>
              <UsersList />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/posts" element={
            <ProtectedRoute allowedRoles={["administrator"]}>
              <PostsList />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/users/update-user/:userId" element={
            <ProtectedRoute allowedRoles={["administrator"]}>
              <UpdateUser />
            </ProtectedRoute>
          } />
          <Route path="/:postSlug" element={<SinglePost />} />
          <Route path="/dashboard/add-post" element={<AddPost />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </CartProvider>
    </>
  );
}

export default App;
