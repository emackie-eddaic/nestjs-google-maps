import {
  GeolocateRequest,
  PlaceDetailsRequest,
  ReverseGeocodeRequest,
  TimeZoneRequest,
} from '@googlemaps/google-maps-services-js';

export type GeolocateRequestData = GeolocateRequest['data'];
export type PlaceDetailsRequestParams = Omit<
  PlaceDetailsRequest['params'],
  'key' | 'client_id' | 'client_secret'
>;
export type ReverseGeocodeParams = Omit<
  ReverseGeocodeRequest['params'],
  'key' | 'client_id' | 'client_secret'
>;
export type TimezoneParams = Omit<
  TimeZoneRequest['params'],
  'key' | 'client_id' | 'client_secret'
>;
