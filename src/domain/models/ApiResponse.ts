export interface APIResponse {
  html_attributions: [];
  result: Result;
  status: string;
  error_message: string;
}

interface Result {
  formatted_address: string;
  geometry: Geometry;
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}
