export interface TwitchConfig {
    readonly clientID: string;
    readonly clientSecret:string;
    readonly callbackURL: string;
    readonly scope: string;
    readonly authorizationURL: string;
    readonly tokenURL: string;
  };