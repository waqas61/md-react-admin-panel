import React from "react";

import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect } from 'react';
import { useState } from 'react';
import { selectUser } from '../store/slices/userSlice';
import { useSelector } from 'react-redux';

const Map = ({ userCurrentLocation, postLocation, postLocationLatLng, setDistance }) => {
  const defaultLocation = { lat: 40.756795, lng: -73.954298 };
  const destination = { lat: 41.756795, lng: -78.954298 };

  let directionsService;
  const [directions, setDirections] = useState(null);
  const [bounds, setBounds] = useState(null);
  const google = window.google;
  const user = useSelector(selectUser);

  // const [userCurrentLocation, setUserCurrentLocation] = useState(() => {
  //   let user_current_location = [];
  //   user.user_locations.map((location, index) => {
  //     if (location.is_current) {
  //       user_current_location.push(location);
  //     }
  //   });
  //   return user_current_location;
  // });


  const onMapLoad = map => {
    directionsService = new google.maps.DirectionsService();
    //load default origin and destination
    let origin = { lat: parseFloat(userCurrentLocation.latitude), lng: parseFloat(userCurrentLocation.longitude) };
    let destination = { lat: parseFloat(postLocation.latitude), lng: parseFloat(postLocation.longitude) };
    let a = (Math.PI / 180) * (90);  // degrees
    let x = destination.lng + (180 / Math.PI) * (2000 / 6378137) / Math.cos(destination.lat) * Math.cos(a);
    let y = destination.lat + (180 / Math.PI) * (2000 / 6378137) * Math.sin(a);
    let final_destination = { lat: y, lng: x };
    let final_destination_server = { lat: parseFloat(postLocationLatLng.latitude), lng: parseFloat(postLocationLatLng.longitude) };
    changeDirection(origin, final_destination_server);
  };

  const changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        // origin: "Liverpool, UK",
        // destination: "Oxford, UK",
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          var METERS_TO_MILES = 0.000621371192;
          var dis = (Math.round(result.routes[0].legs[0].distance.value * METERS_TO_MILES * 10) / 10);
          setDistance(dis);
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
          console.log(result);
        }
      }
    );
  };
  return (
    <div>
      <GoogleMap
        center={defaultLocation}
        zoom={5}
        onLoad={map => onMapLoad(map)}
        mapContainerStyle={{ height: "400px", width: "800px" }}
      >
        {directions !== null && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </div>
  );
}

// class Map extends React.Component {
//   state = {
//     directions: null,
//     bounds: null
//   };

//   onMapLoad = map => {
//     directionsService = new window.google.maps.DirectionsService();
//     //load default origin and destination
//     this.changeDirection(origin, destination);
//   };

//   //function that is calling the directions service
//   changeDirection = (origin, destination) => {
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           //changing the state of directions to the result of direction service
//           this.setState({
//             directions: result
//           });
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   };

//   render() {
//     return (
//       <div>
//         <GoogleMap
//           center={defaultLocation}
//           zoom={5}
//           onLoad={map => this.onMapLoad(map)}
//           mapContainerStyle={{ height: "400px", width: "800px" }}
//         >
//           {this.state.directions !== null && (
//             <DirectionsRenderer directions={this.state.directions} />
//           )}
//         </GoogleMap>
//       </div>
//     );
//   }
// }

export default Map;