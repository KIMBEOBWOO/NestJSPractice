import { Injectable, Inject } from '@nestjs/common';
// import { Model } from 'mongoose';
import { use } from 'passport';

import { GOOGLE_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.config';
import { GoogleConfig } from '../interface/google-config.interface';
import { User } from '../../user/interface/user.interface';

import { AuthService } from '../auth.service';

const GoogleTokenStrategy = require('passport-google-plus-token');

@Injectable()
export class GoogleStrategy {
  constructor(
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: GoogleConfig,
    private readonly authService: AuthService,
    // @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<User>,
  ) {
    this.init();
  }

  private init(): void {
    use('google', new GoogleTokenStrategy({
      clientID: this.googleConfig.client_id,
      clientSecret: this.googleConfig.client_secret
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {
        // const existingUser: User = await this.userModel.findOne({ 'google.id': profile.id });
        const existingUser: User = await this.authService.findUserById(profile.id);
        console.log('is ok?');
        if (existingUser) {
            console.log('[Google Login Success]',existingUser);
            return done(null, existingUser);
        }

        const { id, displayName } = profile;
        const email: string = profile.emails.shift().value;
        const user: User = {
            userId: 3,
            username: id,
            password: displayName,
        }
        // const user: User = new this.userModel({
        //     method: 'google',
        //     roles: ['user'],
        //     google: {
        //         id,
        //         email,
        //         displayName
        //     }
        // });
        console.log('[Google Login Success]',user);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }));
  }
}