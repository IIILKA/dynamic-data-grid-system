import { UserManager } from 'oidc-client-ts';
import { ddgsConfig } from './AuthConfig.ts';
import { jwtDecode } from 'jwt-decode';

const userManager = new UserManager(ddgsConfig.settings);

export interface UserInfo {
  name: string;
  email: string;
}

export async function signUpAsync(username: string, email: string, password: string) {
  const url = `${import.meta.env.VITE_AUTH_AUTHORITY}/user/register`;

  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password
    })
  };

  return await fetch(url, options);
}

export async function logInAsync(email: string, password: string) {
  const url = `${import.meta.env.VITE_AUTH_AUTHORITY}/authenticate`;

  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    }),
    credentials: 'include'
  };

  return await fetch(url, options);
}

export async function getUserAsync() {
  return await userManager.getUser();
}

export async function getUserInfoAsync(): Promise<UserInfo | undefined> {
  const accessToken = await getAccessTokenAsync();
  if (accessToken) {
    return jwtDecode<UserInfo>(accessToken);
  }
  return undefined;
}

export async function isAuthenticatedAsync() {
  const token = await getAccessTokenAsync();
  return !!token;
}

export async function handleOAuthCallbackAsync(callbackUrl) {
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

export async function logoutAsync() {
  await userManager.clearStaleState();
  await userManager.signoutRedirect();
}

// This function is used to access token claims
// `.profile` is available in Open Id Connect implementations
// in simple OAuth2 it is empty, because UserInfo endpoint does not exist
// export async function getRole() {
//     const user = await getUser();
//     return user?.profile?.role;
// }

// This function is used to change account similar way it is done in Google
// export async function selectOrganization() {
//     const args = {
//         prompt: "select_account"
//     }
//     await userManager.signinRedirect(args);
// }
