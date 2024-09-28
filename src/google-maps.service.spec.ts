import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMapsModule } from './google-maps.module';
import { GoogleMapsService } from './google-maps.service';

describe('GoogleMapsService', () => {
  let service: GoogleMapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GoogleMapsModule],
      providers: [],
    }).compile();

    service = module.get<GoogleMapsService>(GoogleMapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('geolocate', () => {
    it('should return GoogleMapService.geolocate.data', async () => {
      const geolocateSpy = jest
        .spyOn(service.client, 'geolocate')
        .mockResolvedValue({ data: 'test' } as never);
      expect(await service.geolocate({})).toEqual('test');
      expect(geolocateSpy).toHaveBeenCalled();
    });
  });

  describe('placeDetails', () => {
    it('should return GoogleMapService.placeDetails.data.result', async () => {
      const placeDetailsSpy = jest
        .spyOn(service.client, 'placeDetails')
        .mockResolvedValue({ data: { result: 'test' } } as never);
      expect(await service.placeDetails({ place_id: 'test' })).toEqual('test');
      expect(placeDetailsSpy).toHaveBeenCalled();
    });
  });

  describe('reverseGeocode', () => {
    it('should return GoogleMapService.placeDetails from result', async () => {
      const reverseGeocodeSpy = jest
        .spyOn(service.client, 'reverseGeocode')
        .mockResolvedValue({ data: { results: ['test'] } } as never);
      const placeDetailsSpy = jest
        .spyOn(service, 'placeDetails')
        .mockResolvedValue('test' as never);
      expect(await service.reverseGeocode({})).toEqual('test');
      expect(reverseGeocodeSpy).toHaveBeenCalled();
      expect(placeDetailsSpy).toHaveBeenCalled();
    });

    it('should throw error if no results', async () => {
      const reverseGeocodeSpy = jest
        .spyOn(service.client, 'reverseGeocode')
        .mockResolvedValue({ data: { results: [] } } as never);
      await expect(service.reverseGeocode({})).rejects.toThrow(Error);
      expect(reverseGeocodeSpy).toHaveBeenCalled();
    });
  });
});
