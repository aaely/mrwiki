import React, { Component } from 'react';
import Strapi from "strapi-sdk-javascript/build/main";
import {Box, SearchField, Icon} from 'gestalt';
import Loader from './Loader';
const apiUrl = process.env.API_URL || "http://192.168.0.9:1337";
const strapi = new Strapi(apiUrl);

class Dashboard extends Component {
    state = {
        applications: [],
        searchTerm: '',
        loadingItems: true
    }

    async componentDidMount() {
        try {
            const response = await strapi.request('POST', '/graphql', {
                data: {
                    query: `query {
                        applications {
                          _id
                          name
                          vendors {
                            name
                          }
                          properties {
                              name
                          }
                        }
                      }`
                }
            });
            console.log(response);
            this.setState({ 
                applications: response.data.applications,
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

    filteredItems = ({ searchTerm, applications }) => {
        return applications.filter(app => {
            return app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.vendors.name.toLowerCase().includes(searchTerm.toLowerCase()); /*||
            app.properties.name.toLowerCase().includes(searchTerm.toLowerCase());*/
        });
    };

    render() {
        let { applications, loadingItems, searchTerm } = this.state;
        return(
        <Box>
                <Box display="flex" justifyContent="center" marginTop={4}>
                <SearchField 
                id="searchField" 
                accessibilityLabel="Items search field" 
                onChange={this.handleChange} 
                placeholder="Search Items" 
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
            {this.filteredItems(this.state).map(app => {
                return(
                    <Box marginTop={5} marginBotom={5}>
                        {app.name} <br />
                        {app.vendors.name} <br />
                        {app.properties.map(prop => {
                            return(
                                <div>
                                    {prop.name}
                                </div>
                            );
                        })}
                    </Box>
                )
            })}
            {loadingItems && <Loader />}
        </Box>
        );
    }
}

export default Dashboard;