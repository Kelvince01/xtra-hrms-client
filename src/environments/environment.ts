export const environment = {
  production: true,
  buildId: `${new Date().getTime()}`,
  BASE_API_URL: 'http://localhost:8000/api/v1/',
  PushNotifications: {
    publicKey: 'BJ0lExu5b8iS3PxARFJyErsOKuqE0K05ed3E_7wKL2uEzeCRqf9sR9eFZJuynDtvwS369BhzYHfM5NuiCsUEg_Y',
    privateKey: '1c9PDXp3ySj4JeI2br98j-zgVlBdCexhcwEuk7BmwT0'
  },
  ROLLBAR_ENABLED: true,
  ROLLBAR_ACCESS_TOKEN: '2855820ccd97455a8d9ff5229610e473',
  ga: 'G-L8JBB402NZ',
  firebaseConfig: {
    apiKey: "AIzaSyBoUB_C-Fwx8bYlRW37jw0lZtOEzdtzBDw",
    authDomain: "xtra-hrms.firebaseapp.com",
    projectId: "xtra-hrms",
    storageBucket: "xtra-hrms.appspot.com",
    messagingSenderId: "392519757296",
    appId: "1:392519757296:web:42ba47e0a25e5ab7dfc135"
  },
  recaptchaKey: '6LcSiEopAAAAAGSZW1_ozLObvcnSMH8BUjOy67IC',
  googleMapsApiKey: 'AIzaSyBPX8S6SwxD8kilaCYBQdsxKLnAlCoSBwc',
  mapbox: {
    accessToken:
      'pk.eyJ1IjoidGltaXphdGVjaG5vbG9naWVzIiwiYSI6ImNsNnVuYWExZDFlbWczZnBiM2Y1bDVsb3YifQ.EFH5dQ1M9ooC-8ZLrWGU3w'
  },
};
