export default function VerifyRequest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-gray-300">
              A sign-in link has been sent to your email address.
            </p>
          </div>
          
          <div className="space-y-4 text-sm text-gray-400">
            <p>Click the link in your email to sign in to your account.</p>
            <p>The link will expire in 24 hours for security.</p>
          </div>

          <div className="mt-8">
            <a 
              href="/auth/signin"
              className="text-purple-400 hover:text-purple-300 text-sm underline"
            >
              ← Back to sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 