import { jwtDecode } from 'jwt-decode';
import { UserManager } from 'oidc-client-ts';
import { Routes } from '../navigation/routes.ts';
import { ddgsConfig } from './auth-config.ts';
import { AuthProvider } from './auth-provider.ts';
import UserInfoModel from './models/user-info-model.ts';

const userManager = new UserManager(ddgsConfig.settings);

export function logInWithExternalProvider(provider: AuthProvider) {
  window.location.href = `${import.meta.env.VITE_AUTH_AUTHORITY}/challenge/${provider}`;
}

export async function getUserAsync() {
  return await userManager.getUser();
}

//TODO: Use redux
export async function getUserInfoAsync(): Promise<UserInfoModel | undefined> {
  const accessToken = await getAccessTokenAsync();
  if (accessToken) {
    return jwtDecode<UserInfoModel>(accessToken);
  }
  return undefined;
}

export async function isAuthenticatedAsync() {
  const token = await getAccessTokenAsync();
  return !!token;
}

export async function handleOAuthCallbackAsync(callbackUrl: string) {
  try {
    const user = await userManager.signinRedirectCallback(callbackUrl);
    return user;
  } catch (e) {
    alert(e);
    console.log(`error while handling oauth callback: ${e}`);
  }
}

export async function sendOAuthRequestAsync() {
  return await userManager.signinRedirect();
}

export async function renewTokenAsync() {
  return await userManager.signinSilent();
}

export async function getAccessTokenAsync() {
  const user = await getUserAsync();
  return user?.access_token;
}

export async function logoutAsync(postLogoutRedirectUri: string = Routes.Login) {
  await userManager.clearStaleState();
  await userManager.signoutRedirect({
    post_logout_redirect_uri: import.meta.env.VITE_SELF_URL + postLogoutRedirectUri
  });
}
