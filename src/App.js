import { Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import Todo from './pages/user/Todo';
import Profile from './pages/user/Profile';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<PrivateRoute />}>
          <Route path="todo" element={<Todo />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  );
}

export default App;
