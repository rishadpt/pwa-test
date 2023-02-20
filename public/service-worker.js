// Register the service worker
import { GenerateSW } from 'workbox-webpack-plugin'

plugins: [
  new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),
]

  