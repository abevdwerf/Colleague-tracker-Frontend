import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.colleaguetracker',
  appName: 'IO Collega Tracker Frontend',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "733509514183-sa302u6f1fhqc7a93j789daqmgr63ckv.apps.googleusercontent.com",
      androidClientId: "733509514183-sa302u6f1fhqc7a93j789daqmgr63ckv.apps.googleusercontent.com",
      iosClientId: "733509514183-vs2j883s5mjmg410v4v24ddiqu3slkd6.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
