import * as Sentry from '@sentry/angular-ivy';

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://568e748870317648a4fd083a5536b772@o4505890548154368.ingest.sentry.io/4506645150957568',
    autoSessionTracking: true,
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
        tracingOrigins: ['localhost', 'https://xtra-hrms-client.vercel.app/'],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
};
