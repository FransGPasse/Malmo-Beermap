export default [
  {
    featureType: "landscape",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 60,
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 40,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        saturation: -100,
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        visibility: "on",
      },
      {
        lightness: 30,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ef8c25",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b6c54c",
      },
      {
        lightness: 40,
      },
      {
        saturation: -40,
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "on" }],
  },
]