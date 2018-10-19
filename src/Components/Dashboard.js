import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Strapi from "strapi-sdk-javascript/build/main";
import {Box, 
        SearchField, 
        Icon,
        Image,
        Text,
        Card,
        Button,
        Container } from 'gestalt';
import Loader from './Loader';
const apiUrl = process.env.API_URL || "http://192.168.0.9:1337";
const strapi = new Strapi(apiUrl);

class Dashboard extends Component {
    state = {
        properties: [],
        searchTerm: '',
        loadingItems: true
    }

    async componentDidMount() {
        try {
            const response = await strapi.request('POST', '/graphql', {
                data: {
                    query: `query {
                        properties {
                          _id
                          name
                          image {
                              _id
                              url
                              name
                            }
                        }
                      }`
                }
            });
            console.log(response);
            this.setState({ 
                properties: response.data.properties,
                loadingItems: false
            });
        } catch(err) {
            console.error(err);
            this.setState({ loadingItems: false });
        }
    }

    handleChange = ({ value }) => {
        this.setState({ searchTerm: value});
    };

    filteredItems = ({ searchTerm, properties }) => {
        return properties.filter(prop => {
            return prop.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    render() {
        let { loadingItems, searchTerm } = this.state;
        return(
        <Container>
                <Box display="flex" justifyContent="center" marginTop={4} marginBottom={4}>
                <SearchField 
                id="searchField" 
                accessibilityLabel="Items search field" 
                onChange={this.handleChange} 
                placeholder="Search Property Names" 
                value={searchTerm}
                />
                <Box
                margin={2}
                >
                    <Icon 
                    icon="filter"
                    color={searchTerm ? 'orange' : 'gray'}
                    size={20}
                    accessibilityLabel="Filter"
                    />
                </Box>
                </Box>
                <Box wrap display ="flex" 
                justifyContent="around"
                dangerouslySetInlineStyle={{
                    __style: {
                        backgroundColor: '#d6e5ff'
                    }
                }}
                shape= "rounded"
                >
            {this.filteredItems(this.state).map(prop => {
                console.log(prop.image.url);
                return(
                    <div className="card" key={prop._id} style={{marginTop: '30px', width: '30%', display: 'inline-block', marginRight: '3px', marginLeft: '3px'}}>
                    <div className="card-image">
                    <img src={`${apiUrl}${prop.image.url}`} alt ={prop.name} className="coffeeimage"/>
                        <span className="card-title">{prop.name}</span>
                    </div>
                    <div className="card-content" style={{backgroundColor:'#686c72'}}>    
                        <p></p>
                        <p>Player Tracking System: </p>
                        <p>Number of slot machines:</p>
                        <p>Text Here</p>
                    </div>
                    <div className="card-action" style={{textAlign: 'center', backgroundColor:'#686c72'}}>
                        <Link to={`/properties/${prop._id}`}>{prop.name}</Link>
                    </div>
                    </div>
            )})}
            {loadingItems && <Loader />}
            </Box>
        </Container>
        );
    }
}

export default Dashboard;