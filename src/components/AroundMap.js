import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { POS_KEY } from "../constants";
import { AroundMarker } from "./AroundMarker";

class AroundMap extends React.Component {
  reloadMarkers = () => {
    const center = this.map.getCenter();
    const position = { lat: center.lat(), lon: center.lng() };
    this.props.loadNearbyPosts(position, this.getRange());
  };

  getMapRef = map => {
    this.map = map;
    window.thismap = map;
  };

  getRange = () => {
    const google = window.google;
    const center = this.map.getCenter();
    const bounds = this.map.getBounds();
    if (center && bounds) {
      const ne = bounds.getNorthEast();
      const right = new google.maps.LatLng(center.lat(), ne.lng());
      return (
        0.000621371192 *
        google.maps.geometry.spherical.computeDistanceBetween(center, right)
      );
    }
  };

  render() {
    const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
    return (
      <GoogleMap
        onDragEnd={this.reloadMarkers}
        onZoomChanged={this.reloadMarkers}
        defaultZoom={11}
        defaultCenter={{ lat: lat, lng: lon }}
        ref={this.getMapRef}
      >
        {this.props.posts && this.props.posts.map(post => (
          <AroundMarker post={post} key={post.url} />
        ))}
      </GoogleMap>
    );
  }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
