import { BearerStrategy, ITokenPayload, VerifyCallback, OIDCStrategy, IOIDCStrategyOptionWithRequest, VerifyOIDCFunctionWithReq } from 'passport-azure-ad';
import { creds } from './config';

export const bearerStrategy = new BearerStrategy({
  clientID: '3ef14a4f-ce9e-4ec0-8b76-22208fb75ffd',
  // identityMetadata: 'https://login.microsoftonline.com/a7992ee5-69ec-4e11-ad35-3dc346e9f8d1/v2.0/.well-known/openid-configuration',
  identityMetadata: 'https://login.microsoftonline.com/rajchauhan.onmicrosoft.com/v2.0/.well-known/openid-configuration',
  loggingLevel: "error"
}, (token: ITokenPayload, done: VerifyCallback) => {
  console.log('token', token);
  token.roles
  done(null, {
    name: "Raj",
    role: "ADMIN"
  }, token);
});



// const odicOption: IOIDCStrategyOptionWithRequest = {
//   identityMetadata: creds.identityMetadata,
//   clientID: creds.clientID,
//   responseType: 'code id_token',
//   responseMode: 'form_post',
//   redirectUrl: creds.redirectUrl,
//   allowHttpForRedirectUrl: creds.allowHttpForRedirectUrl,
//   clientSecret: creds.clientSecret,
//   validateIssuer: creds.validateIssuer,
//   isB2C: false,
//   passReqToCallback: true,
//   scope: creds.scope,
//   loggingLevel: 'error',
//   nonceMaxAmount: creds.nonceMaxAmount,
//   useCookieInsteadOfSession: creds.useCookieInsteadOfSession,
//   cookieEncryptionKeys: creds.cookieEncryptionKeys
// }

// export const odicStrategy = new OIDCStrategy(odicOption, (iss: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) => {
//   if (!profile.oid) {
//     return done(new Error("No oid found"), null);
//   }
//   console.log('profile', profile)
// });