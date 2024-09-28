import {
  Client,
  GeolocateResponseData,
  Place,
  RequestParams,
} from '@googlemaps/google-maps-services-js';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './google-maps.module-definition';
import {
  GeolocateRequestData,
  GoogleMapsConfiguration,
  PlaceDetailsRequestParams,
  ReverseGeocodeParams,
} from './type';

/**
 * @see {@link https://github.com/googlemaps/google-maps-services-js | Google Maps Services JS}
 */
@Injectable()
export class GoogleMapsService {
  readonly client: Client;
  readonly params: RequestParams;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) configuration: GoogleMapsConfiguration,
  ) {
    const { config, params } = configuration;
    this.params = params;
    this.client = new Client(config);
  }

  /**
   * **Note**: `considerIp` considers the IP of the server and should be
   * set false unless evaluating the server's location.
   * @param data
   * @returns
   */
  async geolocate(data: GeolocateRequestData): Promise<GeolocateResponseData> {
    const { data: responseData } = await this.client.geolocate({
      params: this.params,
      data,
    });
    return responseData as GeolocateResponseData;
  }

  async placeDetails(params: PlaceDetailsRequestParams): Promise<Place> {
    const { data } = await this.client.placeDetails({
      params: { ...this.params, ...params },
    });
    return data.result;
  }

  async reverseGeocode(params: ReverseGeocodeParams): Promise<Place> {
    const { data } = await this.client.reverseGeocode({
      params: { ...this.params, ...params },
    });
    if (data.results.length > 0) {
      return this.placeDetails({ place_id: data.results[0].place_id });
    } else {
      throw new Error('No places returned');
    }
  }
}
