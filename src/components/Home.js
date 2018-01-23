import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY, API_ROOT } from '../constants'
import $ from 'jquery';
import { Gallery } from './Gallery';

const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = { 
        loadingGeoLocation: false, 
        loadingPosts: false, 
        posts: [],
        error: "" 
    };

    componentDidMount() {
    this.setState({ loadingGeoLocation: true, error: "" });
    this.getGeoLocation();
    }

    getGeoLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.onSuccessLoadGeoLocation, this.onFailedLoadGeolocation, GEO_OPTIONS);
    } else {
        /* geolocation IS NOT available */
        this.setState({
        error: "Your browser does not support GeoLocation"
        });
    }
    };

    onSuccessLoadGeoLocation = position => {
    console.log(position);
    this.setState({ loadingGeoLocation: false, error: "" });
    const { latitude, longitude } = position.coords;
    localStorage.setItem("POS_KEY", JSON.stringify({
        lat: latitude,
        lon: longitude
        }));
    this.loadNearbyPosts();
    };

    onFailedLoadGeolocation = () => {
    this.setState({
        loadingGeoLocation: false,
        error: "Failed to load GeoLocation!"
    });
    };
    
    getGalleryPanelContent = () => {
    if (this.state.error) {
        return <div>{this.state.error}</div>;
    } else if (this.state.loadingGeoLocation) {
        return <Spin tip="Loading geo location..." />;
    } else if (this.state.loadingPosts) {
        return <Spin tip="Loading posts..." />;
    } else if (this.state.posts && this.state.posts.length > 0) {
        const images = this.state.posts.map(post => {
            return { 
                user: post.user, 
                src: post.url, 
                thumbnail: post.url, 
                thumbnailWidth: 400, 
                thumbnailHeight: 300, 
                caption: post.message 
            };
        });
        return <Gallery images={images} />;
    } else {
        return null;
    }
    };

    loadNearbyPosts = () => {
    // const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
    const lat = 37.7915953;
    const lon = -122.3937977;
    this.setState({ loadingPosts: true });
    // root/search?lat=1111&lon=1111
    $.ajax({
        url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
        method: "GET",
        headers: {
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(
            TOKEN_KEY
        )}`
        }
    })
        .then(response => {
            this.setState({ posts: response, loadingPosts: false, error: "" });
            console.log(response);
        }, error => {
            this.setState({ loadingPosts: true, error: error.responseText });
            console.log(error);
        })
        .catch(error => {
        console.log(error);
        });
    };

    render() {
    return <Tabs tabBarExtraContent={operations}>
        <TabPane tab="Post" key="1">
            {this.getGalleryPanelContent()}
        </TabPane>
        <TabPane tab="Map" key="2">
            Content of tab 2
        </TabPane>
        </Tabs>;
    }
}