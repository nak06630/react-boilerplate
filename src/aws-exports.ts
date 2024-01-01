/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
export default {
  Auth: {
    //https://aws-amplify.github.io/amplify-js/api/globals.html#cognitouserpoolconfig
    Cognito: {
      userPoolId: process.env.VITE_USER_POOLS_ID,
      userPoolClientId: process.env.VITE_USER_POOLS_WEB_CLIENT_ID
    }
  }
}
