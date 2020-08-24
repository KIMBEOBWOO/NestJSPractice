import { GOOGLE_CONFIG_TOKEN, TWITCH_CONFIG_TOKEN } from '../../server.config';
// import { facebookConfig } from './config/facebook-config';
// import { twitterConfig } from './config/twitter-config';
import { googleConfig } from './config/google-config';
import { twitchConfig } from './config/twitch-config';

export const authProviders = [
  {
    provide: GOOGLE_CONFIG_TOKEN,
    useValue: googleConfig
  },
  {
    provide: TWITCH_CONFIG_TOKEN,
    useValue: twitchConfig
  },
]