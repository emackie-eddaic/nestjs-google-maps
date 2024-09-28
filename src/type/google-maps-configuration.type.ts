import {
  ApiKeyParams,
  ClientOptions,
} from '@googlemaps/google-maps-services-js';

export type GoogleMapsConfiguration = {
  params: ApiKeyParams;
  config?: ClientOptions;
};
