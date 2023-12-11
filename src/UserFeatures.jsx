import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MyEntities from './MyEntities';


export default function UserFeatures() {
    let [features, setFeatures] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(null);

    useEffect(() => {
        axios.get("https://featuremarketplacewebapi20231207151555.azurewebsites.net/api/Feature/GetFeaturesByUserName/Venu")
            .then(resp => {
                setFeatures(resp.data);
                console.log(resp.data);
            })
            .catch(err => {

            })

        return () => {

        }
    }, [])

    const handleEditClick = (feature) => {
        setSelectedFeature(feature);
    };

    const handleCloseModal = () => {
        setSelectedFeature(null);
    };

    const handleSaveChanges = async () => {
        try {
            // Make sure selectedFeature is not null
            if (!selectedFeature) return;
    
            // API endpoint for updating the feature
            const apiUrl = `https://featuremarketplacewebapi20231207151555.azurewebsites.net/api/Feature/UpdateFeature/${selectedFeature.entityName}`;
    
            // Make the PUT request to update the feature
            await axios.put(apiUrl, selectedFeature);
    
            // Close the modal and refresh features
            handleCloseModal();
            // You may refresh features by making another API call or updating the state
        } catch (error) {
            // Handle error, e.g., display an error message to the user
            console.error('Error updating feature:', error);
        }
    };
    

    let maprows = features.map(p => {
        return (
            <tr key={p.id}>
                <td className="text-nowrap">{p.entityName}</td>
                <td className="text-nowrap">{p.featureName}</td>
                <td className="text-nowrap">{p.value}</td>
                <td className="text-nowrap">{p.featureDataType}</td>
                <td className="text-nowrap">{p.createdAt}</td>
                {/* <td className="text-nowrap">
                    <Link className='btn btn-primary' to={`/editfeature/${p.entityName}`}>Edit</Link>
                </td> */}
                <td className="text-nowrap">
                <button className="btn btn-primary" onClick={() => handleEditClick(p.id)}>
                    Edit
                </button>
            </td>
                <td className="text-nowrap">
                    <Link className='btn btn-danger' to={`/delete/${p.entityName}`}>Delete</Link>
                </td>
            </tr>
        )
    })


    return (
        <>
       
            <br />
            <div className='container'>
                <MyEntities />
                <h2 className="text-center">My Features</h2>
                <div className='table-responsive'>
                    <table className='table table-striped table-bordered table-hover m-4 text-center' style={{ border: "1px solid orange", overflow: "hidden" }}>
                        <thead>
                            <tr>
                                <th className="text-nowrap">Entity Name</th>
                                <th className="text-nowrap">Feature Name</th>
                                <th className="text-nowrap">Feature Value</th>
                                <th className="text-nowrap">Feature Type</th>
                                <th className="text-nowrap">Timestamp</th>
                                <th className="text-nowrap">Edit</th>
                                <th className="text-nowrap">Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {maprows}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedFeature && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Edit Feature</h2>
                        <label htmlFor="featureName">Feature Name:</label>
                        <input
                            type="text"
                            id="featureName"
                            value={selectedFeature.featureName}
                            onChange={(e) => setSelectedFeature({ ...selectedFeature, featureName: e.target.value })}
                        />
                        <label htmlFor="featureDataType">Feature Type:</label>
                        <input
                            type="text"
                            id="featureDataType"
                            value={selectedFeature.featureDataType}
                            onChange={(e) => setSelectedFeature({ ...selectedFeature, featureDataType: e.target.value })}
                        />
                        <label htmlFor="value">Feature Value:</label>
                        <input
                            type="text"
                            id="value"
                            value={selectedFeature.value}
                            onChange={(e) => setSelectedFeature({ ...selectedFeature, value: e.target.value })}
                        />
                        
                        {/* <label htmlFor="featureDataType">Feature Type</label>
                        <select
                        className='form-control'
                        id="featureDataType"
                        onChange={handleChange}
                        // value={selectedFeatureType}
                        >
                        <option value="">Select Feature Type</option>
                        <option value="int">int</option>
                        <option value="float">float</option>
                        <option value="string">string</option>
                        <option value="double">double</option>
                        
                        </select> */}

                        <button onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            )}
            
            
        </>
    )
}




