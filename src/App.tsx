import { useState } from 'react';
import { TrendingUp, Landmark } from 'lucide-react';
import LeadPriority from './components/LeadPriority';
import LoanApproval from './components/LoanApproval';
import Chatbot from './components/Chatbot';

type ActiveView = 'home' | 'lead' | 'loan';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const handleBackToHome = () => setActiveView('home');

  const renderView = () => {
    switch (activeView) {
      case 'lead':
        return (
          <>
            <button
              onClick={handleBackToHome}
              style={{
                marginBottom: 24,
                alignSelf: 'flex-start',
                background: '#e0f2fe',
                color: '#2563eb',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(30,64,175,0.06)',
              }}
            >
              ← Back to Home
            </button>
            <LeadPriority />
          </>
        );
      case 'loan':
        return (
          <>
            <button
              onClick={handleBackToHome}
              style={{
                marginBottom: 24,
                alignSelf: 'flex-start',
                background: '#cffafe',
                color: '#0e7490',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(6,182,212,0.06)',
              }}
            >
              ← Back to Home
            </button>
            <LoanApproval />
          </>
        );
      default:
        return <HomePage setActiveView={setActiveView} />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: '#f1f5f9',
        fontFamily: 'Inter, Arial, sans-serif',
        overflowX: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '100vw',
          minHeight: '100vh',
          margin: '0 auto',
          padding: '32px 16px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
        }}
      >
        {renderView()}
      </div>
      {/* Floating Chatbot Widget (always visible, bottom right) */}
      <Chatbot />
    </div>
  );
}

function HomePage({
  setActiveView,
}: {
  setActiveView: (view: ActiveView) => void;
}) {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 4rem)',
        background:
          'linear-gradient(135deg, #f1f5f9 0%, #e0f2fe 50%, #cffafe 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '64px 16px 32px 16px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: 16,
              fontFamily: 'Inter, Arial, sans-serif',
            }}
          >
            Welcome to{' '}
            <span
              style={{
                background:
                  'linear-gradient(90deg, #2563eb 60%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FinanceAI
            </span>
          </h1>
          <p
            style={{
              fontSize: 22,
              color: '#475569',
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            Leverage cutting-edge machine learning models to make smarter
            financial decisions with instant predictions and comprehensive
            analytics
          </p>
        </div>

        {/* Cards Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {/* Responsive: 2 columns on medium screens and up */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 32,
            }}
          >
            <div
              onClick={() => setActiveView('lead')}
              style={{
                cursor: 'pointer',
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 4px 24px rgba(30,64,175,0.08)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 8px 32px rgba(30,64,175,0.16)';
                (e.currentTarget as HTMLDivElement).style.transform =
                  'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 24px rgba(30,64,175,0.08)';
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #2563eb 60%, #1e40af 100%)',
                  padding: 32,
                }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(2px)',
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <TrendingUp style={{ width: 32, height: 32, color: '#fff' }} />
                </div>
                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 8,
                  }}
                >
                  Lead Priority Prediction
                </h2>
                <p style={{ color: '#bae6fd', fontSize: 16 }}>
                  AI-powered lead scoring system
                </p>
              </div>
              <div style={{ padding: 32 }}>
                <p style={{ color: '#64748b', marginBottom: 24 }}>
                  Analyze company data and predict lead priority levels (High,
                  Medium, Low) to optimize your sales pipeline and maximize
                  conversion rates.
                </p>
                <ul
                  style={{
                    marginBottom: 24,
                    paddingLeft: 0,
                    listStyle: 'none',
                  }}
                >
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#2563eb', marginTop: 2 }}>✓</span>
                    <span>Revenue and performance analysis</span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#2563eb', marginTop: 2 }}>✓</span>
                    <span>Multi-factor priority scoring</span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#2563eb', marginTop: 2 }}>✓</span>
                    <span>Actionable recommendations</span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#2563eb', marginTop: 2 }}>✓</span>
                    <span>Real-time confidence metrics</span>
                  </li>
                </ul>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#2563eb',
                    fontWeight: 600,
                    gap: 8,
                    fontSize: 16,
                  }}
                >
                  Get Started
                  <span style={{ transform: 'translateX(2px)' }}>→</span>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveView('loan')}
              style={{
                cursor: 'pointer',
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 4px 24px rgba(6,182,212,0.08)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 8px 32px rgba(6,182,212,0.16)';
                (e.currentTarget as HTMLDivElement).style.transform =
                  'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 4px 24px rgba(6,182,212,0.08)';
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #06b6d4 60%, #0e7490 100%)',
                  padding: 32,
                }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(2px)',
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Landmark style={{ width: 32, height: 32, color: '#fff' }} />
                </div>
                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 8,
                  }}
                >
                  Loan Approval System
                </h2>
                <p style={{ color: '#a5f3fc', fontSize: 16 }}>
                  Instant eligibility assessment
                </p>
              </div>
              <div style={{ padding: 32 }}>
                <p style={{ color: '#64748b', marginBottom: 24 }}>
                  Evaluate loan applications with advanced ML algorithms that
                  analyze financial profiles and credit history to provide instant
                  approval decisions.
                </p>
                <ul
                  style={{
                    marginBottom: 24,
                    paddingLeft: 0,
                    listStyle: 'none',
                  }}
                >
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#06b6d4', marginTop: 2 }}>✓</span>
                    <span>Comprehensive financial assessment</span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#06b6d4', marginTop: 2 }}>✓</span>
                    <span>Risk level evaluation</span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#06b6d4', marginTop: 2 }}>✓</span>
                    <span>Loan-to-income ratio analysis</span>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#334155',
                      fontSize: 15,
                    }}
                  >
                    <span style={{ color: '#06b6d4', marginTop: 2 }}>✓</span>
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#06b6d4',
                    fontWeight: 600,
                    gap: 8,
                    fontSize: 16,
                  }}
                >
                  Get Started
                  <span style={{ transform: 'translateX(2px)' }}>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div
          style={{
            marginTop: 64,
            maxWidth: 700,
            margin: '64px auto 0 auto',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 4px 24px rgba(30,64,175,0.08)',
              border: '1px solid #e2e8f0',
              padding: 32,
            }}
          >
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Why Choose FinanceAI?
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 24,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    background: '#dbeafe',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <span style={{ fontSize: 24 }}>⚡</span>
                </div>
                <h4
                  style={{
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: 8,
                  }}
                >
                  Instant Results
                </h4>
                <p style={{ fontSize: 15, color: '#64748b' }}>
                  Get predictions in seconds with our optimized ML models
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    background: '#cffafe',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <span style={{ fontSize: 24 }}>🎯</span>
                </div>
                <h4
                  style={{
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: 8,
                  }}
                >
                  High Accuracy
                </h4>
                <p style={{ fontSize: 15, color: '#64748b' }}>
                  Trained on extensive datasets for reliable predictions
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    background: '#d1fae5',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <span style={{ fontSize: 24 }}>🔒</span>
                </div>
                <h4
                  style={{
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: 8,
                  }}
                >
                  Secure & Private
                </h4>
                <p style={{ fontSize: 15, color: '#64748b' }}>
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ML Models Section */}
        <div style={{
          margin: '48px auto 0 auto',
          maxWidth: 700,
          background: '#f8fafc',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(30,64,175,0.07)',
          border: '1px solid #e2e8f0',
          padding: 28,
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#2563eb',
            marginBottom: 12
          }}>
            Machine Learning Models
          </h3>
          <p style={{ fontSize: 16, color: '#475569', marginBottom: 10 }}>
            FinanceAI leverages advanced ML models for instant predictions:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, color: '#334155' }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Lead Priority Model:</strong> Uses a custom-trained pipeline to analyze company metrics and predict lead priority (High, Medium, Low) for sales optimization.
            </li>
            <li>
              <strong>Loan Approval Model:</strong> Employs a robust classifier to assess financial profiles and credit history, providing fast and accurate loan eligibility decisions.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
