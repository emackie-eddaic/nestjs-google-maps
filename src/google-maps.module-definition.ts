import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GoogleMapsConfiguration } from './type';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<GoogleMapsConfiguration>({
    moduleName: 'GoogleMap',
  }).build();
