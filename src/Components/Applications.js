import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Strapi from 'strapi-sdk-javascript/build/main';
import Loader from './Loader';
const apiUrl = process.env.API_URL || 'http://192.168.0.9:1337';
const strapi = new Strapi(apiUrl);

class Applications extends Component {
    state = {
        searchTerm: '',
        loadingItems: true,
        application: '',
        properties: [],
        vendor: ''
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
            loadingItems: false
        });
        }catch (err) {
            console.log(err);
            this.setState({ loadingItems: false });
        }
    }

    render() {
        let { application, vendor, properties, loadingItems } = this.state;
        return(
            <div>
                <h1>Application page</h1>
                {application} <br />
                {vendor}
                <h3>
                    Properties that also utilize this app
                </h3>
                {properties.map(prop => {
                    return(
                        <div>
                            {prop.name}
                        </div>
                    );
                })} 
                {loadingItems && <Loader />}
            </div>
        );
    }
}

export default Applications;