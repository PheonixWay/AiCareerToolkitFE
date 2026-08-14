import { useMemo, useState } from 'react'
import { api } from './api'
import { API_ENDPOINTS } from './api/endpoints'

const STORAGE_KEY = 'aict_auth'

function App() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
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
      <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid w-full items-stretch gap-8 lg:grid-cols-2">
          <div className="order-2 rounded-3xl border border-emerald-200/70 bg-white/70 p-8 shadow-soft backdrop-blur-sm lg:order-1 lg:p-12">
            <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              AI Career Toolkit
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Login to unlock your
              <span className="block text-emerald-600">JD Intelligence Workspace</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-slate-600">
              Sign in first, then extract job titles, skills, and interview questions from any job description in seconds.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <p className="rounded-xl bg-slate-50 px-4 py-3">Fast extraction with structured output.</p>
              <p className="rounded-xl bg-slate-50 px-4 py-3">Built for recruiters, students, and job seekers.</p>
            </div>
          </div>

          <div className="order-1 animate-floatIn rounded-3xl border border-slate-200 bg-white p-8 shadow-soft lg:order-2 lg:p-12">
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Use your backend credentials to continue.</p>

            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, username: event.target.value }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, password: event.target.value }))
                  }
                />
              </div>

              {authError ? (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{authError}</p>
              ) : null}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {authLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </section>
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