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
import AuthGuard from './AuthGuard';


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
    //setToken(authenticatedToken);
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
          {/* <Route path="/featurehome" element={<FeatureHome></FeatureHome>}></Route> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/first-factor" element={<FirstFactorAuth onSuccess={handleFirstFactorSuccess}/>} />
          <Route path="/second-factor" element={<SecondFactorAuth username={username} onSuccess={handleSecondFactorSuccess}/>} />

          <Route path="/featurehome" element={<AuthGuard><FeatureHome /></AuthGuard>} />
          <Route path="/Addfeature" element={<AuthGuard><AddFeature /></AuthGuard>} />
          <Route path="/CsvUploader" element={<AuthGuard><CsvUploader /></AuthGuard>} />
          <Route path="/customsearch" element={<AuthGuard><CustomSearch /></AuthGuard>} />
          <Route path="/searchresult" element={<AuthGuard><SearchResult /></AuthGuard>} />
          <Route path="/userfeatures" element={<AuthGuard><UserFeatures /></AuthGuard>} />
          <Route path="/viewentity/:id" element={<AuthGuard><ViewEntity /></AuthGuard>} />
          <Route path="/editfeature/:id" element={<AuthGuard><EditFeature /></AuthGuard>} />
          <Route path='/MyFavorites' element={<AuthGuard><MyFavorites /></AuthGuard>} />
          <Route path='/ChatbotButton' element={<AuthGuard><ChatbotButton /></AuthGuard>} />
          
        </Routes>
       
      </AuthProvider>
      
    </>
  );
}

export default App;
