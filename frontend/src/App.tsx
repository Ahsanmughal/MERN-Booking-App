import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";

const App = () => {

  const {isLoggedIn} = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={ 
          <Layout>
            <p>Home Page</p>
          </Layout> 
        }/>
        <Route path="/search" element={
          <Layout>
          <p>Search Page</p>
          </Layout>
        }/>
        <Route path="/register" element={ 
          <Layout>
            <Register/>
          </Layout> 
        }/>

        <Route path="/signin" element={ 
          <Layout>
            <SignIn/>
          </Layout> 
        }/>

        {
          isLoggedIn && (<>
            <Route path="/add-hotel" element={
              <Layout>
                <AddHotel />
              </Layout>
            }/>
          </>)
        }

        {
          isLoggedIn && (<>
            <Route path="/my-hotels" element={
              <Layout>
                <MyHotels />
              </Layout>
            }/>
          </>)
        }

        {
          isLoggedIn && (<>
            <Route path="/edit-hotel/:hotelId" element={
              <Layout>
                <EditHotel />
              </Layout>
            }/>
          </>)
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;