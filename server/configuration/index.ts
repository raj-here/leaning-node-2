import passport from 'passport';
import { bearerStrategy} from './passport';

passport.use(bearerStrategy);

export default passport;