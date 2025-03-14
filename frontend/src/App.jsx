import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext, UserContextProvider } from "./context/userContext";
import { useContext } from "react";
import Loading from "./components/Loading";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPages from "./pages/UserPages";
import PersonalPage from "./pages/PersonalPage";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Transaction from "./pages/Transaction";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserContextProvider>
  );
};

const AppRoutes = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/my-pages"
        element={
          user === null ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : user ? (
            <UserPages />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/:pageName" element={<PersonalPage />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
};

export default App;
