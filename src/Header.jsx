import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import home from "./home.svg"

import axios from 'axios';
import "./Styles/Header.css";
import {AppConfigurationClient} from "@azure/app-configuration";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import SearchResult from './SearchResult';
import LogoutButton from './Login/LogoutButton';


const configService = new AppConfigurationClient("Endpoint=https://featureflags.azconfig.io;Id=d7aJ;Secret=aitgNx9JIyQYmZ0X+nSVKPoC/KwPNZE9k9YHwesXDyo=");

  
export default function Header() {


  const [featureFlags, setFeatureFlags]=useState({
    addFeature:false,
    uploadFeature:false,
    favourites:false,
    myFeature:false,
    customSearch:false,
   });

    const fetchFeatureFlags = async () => {
      try {
        const addFeatureResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/addFeature',
        });
        const uploadFeatureResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/uploadFeature',
        });
        const favouritesResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/favourites',
        });
        const myFeatureResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/myFeature',
        });
        const customSearchResponse = await configService.getConfigurationSetting({
          key: '.appconfig.featureflag/customSearch',
        });
        setFeatureFlags({
          addFeature: JSON.parse(addFeatureResponse?.value)?.enabled === true,
          uploadFeature: JSON.parse(uploadFeatureResponse?.value)?.enabled === true,
          favourites: JSON.parse(favouritesResponse?.value)?.enabled === true,
          myFeature: JSON.parse(myFeatureResponse?.value)?.enabled === true,
          customSearch: JSON.parse(customSearchResponse?.value)?.enabled === true,
        });
      } catch (error) {
        console.error('Error fetching feature flags:', error);
      }
    };
    useEffect(() => {
    fetchFeatureFlags();
     // Polling every 5 seconds (adjust as needed)
     const pollingInterval = setInterval(fetchFeatureFlags, 1000);
     return () => clearInterval(pollingInterval);
  }, []);


  const [searchResults, setSearchResults] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false); // New state
  const navigate = useNavigate();

  
  async function SearchAPI() {
    const response = await axios.get(`https://featuremarketplacewebapi20231207151555.azurewebsites.net/api/Entity/GetEntityByEntityName/${searchTerm}`);
    setSearchResults(response.data);
    console.log(response.data);
    navigate('/searchresult');
    setShowSearchResults(true); // Update state to show search results

  }

  function HandleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  // const renderSearchResult = ((searchResults.length > 0 ) && (<SearchResult data={searchResults} />));

  return (
    
      <>
        <Navbar expand="lg" className="custom-orange-bg">
          <Container fluid>
            <Link to="/featurehome">
            <img src={home}/> 
            </Link>
            &nbsp; &nbsp;
            <Navbar.Brand href="/featurehome" style={{ color: 'white', fontWeight: 'bolder'}}>Feature Marketplace</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

              {/* {featureFlags.addFeature?( */}
              <Nav.Link id='navlinks' href="/AddFeature" >Add Feature</Nav.Link>
              {/* ):(
                <p></p>
              )} */}

{/* {featureFlags.uploadFeature?( */}

                <Nav.Link id='navlinks' href="/CsvUploader">Upload Feature</Nav.Link>
                {/* ):(
                  <p></p>
                )} */}


{/* {featureFlags.favourites?( */}

                <Nav.Link  id='navlinks' href="/MyFavorites">Favourites</Nav.Link>
                {/* ):(
                  <p></p>
                )} */}


{/* {featureFlags.myFeature?( */}

                <Nav.Link id='navlinks'  href="/UserFeatures">My Feature</Nav.Link>
                {/* ):(
                  <p></p>
                )} */}


{/* {featureFlags.customSearch?( */}

                <Nav.Link id='navlinks'  href="/CustomSearch">Custom Search</Nav.Link>

                {/* ):(
                  <p></p>
                )} */}
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search Entities..."
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={HandleInputChange}
                />
                {/* <Link to="searchresult" >
                  <Button style={{ color: 'white'}} variant="outline-success" onClick={SearchAPI} className="btn btn-secondary" >Search</Button>
                  </Link> */}
                  <Button
                    style={{ color: 'white' }}
                    variant="outline-success"
                    onClick={SearchAPI}
                    className="btn btn-secondary"
                  >
                    Search
                  </Button>
              </Form>
              &nbsp;  &nbsp;
              
              <LogoutButton></LogoutButton>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>

      
    
        {showSearchResults > 0 && <SearchResult data={searchResults} />}
        
        {/* <SearchResult data={searchResults}/> */}
      </>
      
    
  )
}
