# nestjs-google-maps

Simple [NestJS](https://nestjs.com/) Module to support a [google-maps-services-js](googlemaps/google-maps-services-js) client.

## Installation

```sh
npm install @eddaic/nestjs-google-maps
```

## Usage

### Initializing

```typescript
import { GoogleMapsModule } from '@eddaic/nestjs-google-maps';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GoogleMapsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        params: { key: config.get('GOOGLE_API_KEY') },
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
```

### Calling

```typescript
import { GoogleMapsService } from '@eddaic/nestjs-google-maps';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MyService {
  constructor(private readonly maps: GoogleMapsService) {}

  helloWorld() {
    // Some convenience methods are included
    const place_id = 'test';
    const placeDetails = await this.maps.placeDetails({ place_id });

    // Otherwise can access the client directly for full set of APIs
    const request = {};
    const response = await this.maps.client.nearestRoads(request);
  }
}
```
