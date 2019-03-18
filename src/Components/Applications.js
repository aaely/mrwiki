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
        application: '',
        properties: [],
        vendor: '',
        vendorId: ''
    }

    async componentDidMount() {
        try {
            //console.log(this.props.match.params.itemId);
            const response = await strapi.request('POST', '/graphql', {
            data: {
                query: `query {
                    application (id : "${this.props.match.params.appId}") {
                    _id
                    name
                    vendors {
                        _id
                        name
                    }
                    properties {
                        _id
                        name
                    }
                  }
                }`
            }
        }
        );
        this.setState({
            application: response.data.application.name,
            vendor: response.data.application.vendors.name,
            properties: response.data.application.properties,
            vendorId: response.data.application.vendors._id,
            loadingItems: false
        });
        }catch (err) {
            console.log(err);
            this.setState({ loadingItems: false });
        }
    }

    render() {
        let { application, vendor, properties, loadingItems, vendorId } = this.state;
        return(
            <div>
                <h1 style={{textAlign: 'center'}}>{application}</h1>
                <Link to={`/vendors/${vendorId}`}><h3 style={{textAlign: 'center'}}>{vendor}</h3></Link>
                <h3>
                    Properties that also utilize this app
                </h3>
                {properties.map(prop => {
                    return(
                        <div>
                            <Link to={`/properties/${prop._id}`}>{prop.name}</Link>
                        </div>
                    );
                })} 
                {loadingItems && <Loader />}
            </div>
        );
    }
}

export default Applications;