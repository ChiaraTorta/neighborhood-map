# My Neighborhood Map

## Overview

This app was built for the [Udacity Front-End Web Developer Nanodegree Program](https://eu.udacity.com/course/front-end-web-developer-nanodegree--nd001).

The purposes of the project were:
- to develop a single-page application using React featuring a map of my neighborhood (Esslingen, Germany)
- to implement map markers to identify popular locations, a search function to easily discover these locations, and a list view to support simple browsing of all locations.
- to implement a third-party APIs that provide additional information about each of these locations (I used Google Maps and Foursquare APIs)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage:

To run the app you need:
- Node.js installed on your computer
- [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Foursquare API](https://developer.foursquare.com/docs/api)
You can put both APIs into src/utils.js file.

### Development Mode

- Clone the Repository.
- `npm install` - install all projects dependencies
- `npm start` - start the serber

### Production Mode

This mode includes a Service Worker.
- `npm run build` - create a production build
- Navigate to the build directory and start the server with `npm run deploy`

## Resources:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation/)
- [Foursquare API](https://developer.foursquare.com/)
- [Create-react-app](https://github.com/facebook/create-react-app)

## Attributions:
- [CodeSession: Google Maps with ReactJS Oct-16 with @RyanWaite.ProjectCoach - YouTube](https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be)
- [Passing Functions to Components](https://reactjs.org/docs/faq-functions.html)
- [Bindings Functions in React](https://codeburst.io/binding-functions-in-react-b168d2d006cb)
- [Don't Use Bind When Passing Props](https://daveceddia.com/avoid-bind-when-passing-props/)
