import React from 'react';
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS } from '../constants'
const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeolocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
    }

    onFailedLoadGeolocation = () => {

    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations}>
                <TabPane tab="Post" key="1">
                Content of tab 1
                </TabPane>
                <TabPane tab="Map" key="2">
                Content of tab 2
                </TabPane>
            </Tabs>
        );
    }
}