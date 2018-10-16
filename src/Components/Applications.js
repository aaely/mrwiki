import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import Loader from './Loader';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Applications extends Component {
    state = {
        searchTerm: '',
        loadingItems: true,
        vendors: [],
        applications: []
    }
    
    render() {
        return(
            <div>
                Applications
            </div>
        );
    }
}

export default Applications;