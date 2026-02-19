import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RosM Autos - Quality Used Vehicles for Export',
    short_name: 'RosM Autos',
    description: 'Quality-inspected used automobiles, farm tractors, and electric bikes for international export.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0F1B2D',
    icons: [
      {
        src: '/icons/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
