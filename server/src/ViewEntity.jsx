import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Styles/FeatureHome.css';
import './Styles/ViewEntity.css';
import React, { useState, useEffect } from 'react';

export default function ViewEntity(props) {
  const { id } = useParams(); // Access the 'id' parameter

  const [entityDetails, setEntityDetails] = useState({});
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Fetch entity details
    axios.get(`https://featuremarketplacewebapi20231207151555.azurewebsites.net/api/Entity/GetEntityByEntityName/${id}`)
      .then(resp => {
        setEntityDetails(resp.data);
        console.log(resp.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });

    // Fetch features based on the entity name
    axios.get(`https://featuremarketplacewebapi20231207151555.azurewebsites.net/api/Feature/GetFeaturesByEntityName/${id}`)
      .then(resp => {
        setFeatures(resp.data);
        console.log(resp.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });

    return () => {
      
    };
  }, [id]);

  let maptitle = (
    <div>
      <h2>{entityDetails.entityName}</h2>
      <p>{entityDetails.description}</p>
    </div>
  );

  let maprows = features.map(p => (
    <tr key={p.featureName}>
      <td>{p.featureName}</td>
      <td>{p.value}</td>
      <td>{p.featureDataType}</td>
      <td>{p.createdAt}</td>
    </tr>
  ));

  return (
    <>
      <div className='.container'>
        {maptitle}
      
     <br></br>
      
      <h4>Features listed in this Entity.</h4>
      
      
      <div className="landing-page">
      
        <div className="table-container">
        <div className='table-responsive'>
        <table className='table table-striped table-bordered table-hover' style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th>Feature Name</th>
              <th>Feature Value</th>
              <th>Feature Type</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {maprows}
          </tbody>
        </table>
      </div>
          
        </div>
      </div>
      </div>
    </>
  );
}
