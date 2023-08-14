export default {
  //  "aws_project_region": "YOUR_REGION",
  //  "aws_cognito_identity_pool_id": "YOUR_IDENTITY_POOL_ID",
  aws_cognito_region: 'ap-northeast-1',
  aws_user_pools_id: process.env.VITE_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.VITE_USER_POOLS_WEB_CLIENT_ID,
  oauth: {}
}
