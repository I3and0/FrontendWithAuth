import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes,  Route, useNavigate } from "react-router-dom";
import FeatureHome from "./FeatureHome";
import ChatbotButton from "./Components/ChatbotButton"
import CustomSearch from './CustomSearch';
import AddFeature from './AddFeature';
import MyFavorites from './MyFavorites';
import CsvUploader from './CsvUploader';
import UserFeatures from './UserFeatures';
import SearchResult from './SearchResult';
import ViewEntity from './ViewEntity';
import EditFeature from './EditFeature';
import Header from './Header';
import FirstFactorAuth from "./Login/FirstFactorAuth";
import SecondFactorAuth from "./Login/SecondFactorAuth";
import LandingPage from "./Pages/LandingPage"
import { AuthProvider } from './Components/AuthContext';
import PrivateRoute from './Components/PrivateRoute'; 


function App() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const hideHeaderRoutes = ["/", "/first-factor", "/second-factor"];

  const shouldRenderHeader = () => {
    const currentPath = window.location.pathname;
    return !hideHeaderRoutes.includes(currentPath);
  };

  const handleFirstFactorSuccess = (authenticatedUsername) => {
    setUsername(authenticatedUsername);
    navigate('/second-factor');
  };

  const handleSecondFactorSuccess = (authenticatedToken) => {
    setToken(authenticatedToken);
    navigate("/featurehome");
  };

  return (
    <>
    
      <AuthProvider>
        {shouldRenderHeader() && <Header />}
        
        <Routes>


          {/* <Route path='/privateroute' element={<PrivateRoute></PrivateRoute>}>
            <Route path='/privateroute/featurehome' element={<FeatureHome></FeatureHome>}></Route>
          </Route> */}

          {/* <Route path="/privateroute/*" element={<PrivateRoute />}>
            <Route path="privateroute/featurehome" element={<FeatureHome />} />
          </Route> */}
          {/* <PrivateRoute path="/featurehome" element={<FeatureHome />} /> */}
          {/* <PrivateRoute path="/featurehome" element={<FeatureHome></FeatureHome>}></PrivateRoute> */}
          <Route path="/featurehome" element={<FeatureHome></FeatureHome>}></Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/customsearch" element={<CustomSearch />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/Addfeature" element={<AddFeature />} />
          <Route path="/CsvUploader" element={<CsvUploader />} />
          <Route path="/userfeatures" element={<UserFeatures />} />
          <Route path="/viewentity/:id" element={<ViewEntity />} />
          <Route path="/editfeature/:id" element={<EditFeature />} />
          <Route path='/MyFavorites' element={<MyFavorites />} />
          <Route path='/ChatbotButton' element={<ChatbotButton />} />
          <Route path="/first-factor" element={<FirstFactorAuth onSuccess={handleFirstFactorSuccess}/>} />
          <Route path="/second-factor" element={<SecondFactorAuth username={username} onSuccess={handleSecondFactorSuccess}/>} />
        </Routes>
       
      </AuthProvider>
      
    </>
  );
}

export default App;
