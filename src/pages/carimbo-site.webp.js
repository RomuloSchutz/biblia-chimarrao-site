import { Buffer } from 'node:buffer';
import { carimboOficial } from '../data/carimbo.js';

export const prerender = true;

export function GET() {
  const base64 = carimboOficial.split(',')[1] || '';
  const bytes = Buffer.from(base64, 'base64');
  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}
