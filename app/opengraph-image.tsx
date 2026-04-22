import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'RosM Autos - Quality Used Vehicles for Export from Germany'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F1B2D 0%, #1a2d47 50%, #0F1B2D 100%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '96px', fontWeight: 700, color: '#FFFFFF' }}>RosM</span>
          <span style={{ fontSize: '96px', fontWeight: 700, color: '#D4A853' }}>Autos</span>
        </div>
        <div
          style={{
            width: '400px',
            height: '3px',
            background: '#D4A853',
            opacity: 0.6,
            marginBottom: '32px',
            borderRadius: '2px',
          }}
        />
        <span style={{ fontSize: '28px', color: '#FFFFFF', opacity: 0.8, textAlign: 'center', maxWidth: '800px' }}>
          Quality Used Vehicles for Export from Germany
        </span>
        <span style={{ fontSize: '20px', color: '#D4A853', marginTop: '16px', opacity: 0.7 }}>
          Africa • South America • Eastern Europe
        </span>
      </div>
    ),
    { ...size }
  )
}
