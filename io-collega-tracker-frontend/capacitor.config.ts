import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.colleaguetracker',
  appName: 'IO Collega Tracker Frontend',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "438901753170-4s3sdluu5ib01dovth3sva1572ecpvkr.apps.googleusercontent.com",
      androidClientId: "438901753170-4s3sdluu5ib01dovth3sva1572ecpvkr.apps.googleusercontent.com",
      iosClientId: "733509514183-vs2j883s5mjmg410v4v24ddiqu3slkd6.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
