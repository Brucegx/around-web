import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { POS_KEY } from '../constants';

class AroundMap extends React.Component {
    state = {
        isOpen: false,
    }

    onToggleOpen = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }));
    }
  render() {
      const { lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
    return (
      <GoogleMap
        defaultZoom = { 8 }
        defaultCenter={{ lat: lat, lng: lon }}
      >
        {
            this.props.posts.map((post) => 
                <Marker 
                    position={{ lat: post.location.lat, lng: post.location.lon }} 
                    onClick={this.onToggleOpen}
                    key = {post.url}>
                    {this.state.isOpen ? <InfoWindow oncloseClick={this.onToggleOpen}>
                      <div>Text</div>
                    </InfoWindow> : null}
                </Marker>
            ) 
        }
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
