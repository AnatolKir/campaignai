// Temporarily disabled to fix routing issues
// import { handlers } from '../../../../auth'

// export const { GET, POST } = handlers 

// NextAuth temporarily disabled for deployment
export async function GET() {
  return new Response('NextAuth temporarily disabled', { status: 503 });
}

export async function POST() {
  return new Response('NextAuth temporarily disabled', { status: 503 });
} 