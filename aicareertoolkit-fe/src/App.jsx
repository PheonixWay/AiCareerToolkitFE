import { useMemo, useState } from 'react'
import { api } from './api'
import { API_ENDPOINTS } from './api/endpoints'

const STORAGE_KEY = 'aict_auth'

function App() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return null
    }

    try {
      const parsed = JSON.parse(saved)
      if (parsed?.token && parsed?.username) {
        return parsed
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }

    return null
  })
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [jdText, setJdText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isLoggedIn = useMemo(() => Boolean(auth?.token), [auth])

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setAuthError('Please enter both username and password.')
      return
    }

    setAuthLoading(true)
    setAuthError('')

    try {
      const response = await api.post(API_ENDPOINTS.auth.login, {
        username: credentials.username,
        password: credentials.password,
      })

      const nextAuth = {
        token: response.data.access_token,
        username: credentials.username.trim(),
      }
      setAuth(nextAuth)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth))
      setCredentials({ username: '', password: '' })
      setShowPassword(false)
    } catch (err) {
      if (err?.response?.status === 401) {
        setAuthError('Incorrect username or password.')
      } else {
        setAuthError('Could not connect to backend. Please verify API server is running.')
      }
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    setAuth(null)
    setResult(null)
    setJdText('')
    setError('')
    setShowPassword(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleExtract = async () => {
    if (!jdText.trim()) {
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await api.post(
        API_ENDPOINTS.jd.extract,
        {
          raw_text: jdText,
        },
        {
          headers: auth?.token
            ? {
              Authorization: `Bearer ${auth.token}`,
            }
            : {},
        },
      )
      setResult(response.data)
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        'Extraction failed. Please try again after checking backend logs.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md animate-floatIn rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-md sm:rounded-3xl sm:p-8 md:p-10">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              AI Career Toolkit
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back
            </h1>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring-2"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(event) =>
                  setCredentials((prev) => ({ ...prev, username: event.target.value }))
                }
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-slate-900 outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring-2"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, password: event.target.value }))
                  }
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {authError ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {authError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              {authLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">AI Career Toolkit</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">JD Extractor Console</h1>
          <p className="mt-1 text-sm text-slate-600">Signed in as {auth?.username}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Logout
        </button>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Paste Job Description</h2>
          <p className="mt-2 text-sm text-slate-600">
            Add a full JD below and extract role title, experience, skills, and interview prep questions.
          </p>

          <textarea
            rows="12"
            className="mt-5 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring"
            placeholder="Paste JD text here..."
            value={jdText}
            onChange={(event) => setJdText(event.target.value)}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExtract}
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              {loading ? 'Extracting...' : 'Extract JD'}
            </button>
            <button
              type="button"
              onClick={() => {
                setJdText('')
                setResult(null)
                setError('')
              }}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear
            </button>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Extracted Output</h2>

          {!result ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
              Your structured extraction result will appear here.
            </div>
          ) : (
            <div className="mt-5 space-y-5 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Job Title</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{result.job_title}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Experience Required</p>
                <p className="mt-1 font-medium text-slate-900">{result.years_of_experience}</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Must Have Skills</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  {result.must_have_skills.map((skill, index) => (
                    <li key={`must-${index}`}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Good To Have Skills</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  {result.good_to_have_skills.map((skill, index) => (
                    <li key={`good-${index}`}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Interview Prep Questions</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                  {result.potential_interview_questions.map((question, index) => (
                    <li key={`question-${index}`}>{question}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App