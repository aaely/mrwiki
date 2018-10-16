import React, { Component } from 'react';
import Strapi from "strapi-sdk-javascript/build/main";
import {Box} from 'gestalt';
import Loader from './Loader';
const apiUrl = process.env.API_URL || "http://localhost:1337";
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

    render() {
        let { applications, loadingItems } = this.state;
        return(
        <Box>
            {applications.map(app => {
                return(
                    <Box marginTop={5} marginBotom={5}>
                        {app.name} <br />
                        {app.vendors.name} <br />
                    </Box>
                )
            })}
            {loadingItems && <Loader />}
        </Box>
        );
    }
}

export default Dashboard;