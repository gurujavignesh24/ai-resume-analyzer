import { useState } from 'react'

function App() {
  // State variables to store user input, loading status, and AI results
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  // Function that sends the data to our FastAPI backend
  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please fill in both fields before analyzing.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: jobDescription,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        // The backend returns Gemini's response as a JSON string, so we parse it here
        const parsedAnalysis = JSON.parse(data.analysis)
        setResult(parsedAnalysis)
      } else {
        setError('Something went wrong during analysis.')
      }
    } catch (err) {
      setError('Could not connect to the backend server. Make sure it is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2563eb' }}>AI Resume & Career Analytics</h1>
      <p style={{ textAlign: 'center', color: '#64748b' }}>Compare your profile against any job description instantly.</p>

      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />

      {/* Input Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Paste Resume Text:</label>
          <textarea 
            rows="6" 
            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', resize: 'vertical' }}
            placeholder="Paste the contents of your resume here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Paste Job Description:</label>
          <textarea 
            rows="6" 
            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', resize: 'vertical' }}
            placeholder="Paste the target job description details here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {error && <p style={{ color: '#dc2626', fontWeight: '500' }}>⚠️ {error}</p>}

        <button 
          onClick={handleAnalyze}
          disabled={loading}
          style={{ 
            backgroundColor: loading ? '#93c5fd' : '#2563eb', 
            color: 'white', 
            padding: '14px', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Analyzing Profile with Gemini AI...' : 'Analyze Match Score'}
        </button>
      </div>

      {/* Results Display Section */}
      {result && (
        <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ marginTop: '0', color: '#1e293b' }}>Analysis Results</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>Match Score:</span>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: result.match_percentage > 70 ? '#16a34a' : result.match_percentage > 40 ? '#d97706' : '#dc2626'
            }}>
              {result.match_percentage}%
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', color: '#475569', marginBottom: '8px' }}>Missing Core Keywords:</h3>
            {result.missing_keywords && result.missing_keywords.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.missing_keywords.map((keyword, index) => (
                  <span key={index} style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: '#16a34a', margin: '0' }}>Excellent! No critical keywords are missing.</p>
            )}
          </div>

          <div>
            <h3 style={{ fontSize: '16px', color: '#475569', marginBottom: '8px' }}>AI Improvement Suggestions:</h3>
            <p style={{ color: '#334155', lineHeight: '1.6', margin: '0' }}>{result.profile_summary}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App