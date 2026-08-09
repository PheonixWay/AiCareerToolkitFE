import { useState } from 'react'
import axios from 'axios'

function App() {
  const [jdText, setJdText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleExtract = async () => {
    if (!jdText) return;
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Backend ko request bhej rahe hain
      const response = await axios.post('http://127.0.0.1:8000/api/v1/jd/extract', {
        raw_text: jdText
      })
      setResult(response.data)
    } catch (err) {
      setError('Something went wrong. Backend chalu hai kya check karo!')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AI Career Toolkit 🚀</h1>
      <p>Paste any Job Description below to extract insights.</p>
      
      <textarea 
        rows="10" 
        style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
        placeholder="Paste JD here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />
      
      <button 
        onClick={handleExtract} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        {loading ? 'Extracting via AI...' : 'Extract JD'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {/* Jab result aayega, tab yeh section dikhega */}
      {result && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h2>Extracted Details</h2>
          <p><strong>Job Title:</strong> {result.job_title}</p>
          <p><strong>Experience Required:</strong> {result.years_of_experience}</p>
          
          <h3>Must Have Skills</h3>
          <ul>
            {result.must_have_skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>

          <h3>Good To Have Skills</h3>
          <ul>
            {result.good_to_have_skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>

          <h3>Interview Prep Questions</h3>
          <ul>
            {result.potential_interview_questions.map((q, index) => <li key={index}>{q}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App