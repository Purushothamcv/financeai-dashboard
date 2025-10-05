import { useState } from 'react';
import { Landmark, User, Wallet, FileText, CheckCircle, XCircle } from 'lucide-react';

interface LoanFormData {
  gender: string;
  married: string;
  dependents: number;
  education: string;
  self_employed: string;
  applicant_income: number;
  coapplicant_income: number;
  loan_amount: number;
  loan_amount_term: number;
  credit_history: number;
  property_area: string;
}

interface LoanPredictionResult {
  status: 'Approved' | 'Rejected';
  score: number;
  confidence: number;
}

const API_URL = 'http://localhost:8000/predict-loan-approval'; // <-- Correct backend URL

export default function LoanApproval() {
  const [formData, setFormData] = useState<LoanFormData>({
    gender: 'Male',
    married: 'Yes',
    dependents: 0,
    education: 'Graduate',
    self_employed: 'No',
    applicant_income: 5000,
    coapplicant_income: 0,
    loan_amount: 100,
    loan_amount_term: 360,
    credit_history: 1,
    property_area: 'Urban',
  });

  const [prediction, setPrediction] = useState<LoanPredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Map frontend keys to backend keys
    const payload = {
      Gender: formData.gender,
      Married: formData.married,
      Dependents: formData.dependents,
      Education: formData.education,
      Self_Employed: formData.self_employed,
      ApplicantIncome: formData.applicant_income,
      CoapplicantIncome: formData.coapplicant_income,
      LoanAmount: formData.loan_amount,
      Loan_Amount_Term: formData.loan_amount_term,
      Credit_History: formData.credit_history,
      Property_Area: formData.property_area,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const result: LoanPredictionResult = await response.json();
      setPrediction(result);
    } catch (error) {
      setPrediction(null);
      // Optionally handle error
    }

    setIsLoading(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-emerald-600 bg-emerald-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const propertyAreas = ['Rural', 'Semiurban', 'Urban']; // Only valid values

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-cyan-600 p-3 rounded-2xl shadow-lg">
              <Landmark className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Loan Approval System</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            AI-powered loan assessment for fast, accurate eligibility decisions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Applicant Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-600" /> Personal Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <select
                      value={formData.married}
                      onChange={(e) => setFormData({ ...formData, married: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Yes">Married</option>
                      <option value="No">Single</option>
                    </select>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={formData.dependents}
                      onChange={(e) => setFormData({ ...formData, dependents: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                      placeholder="Dependents"
                    />
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Graduate">Graduate</option>
                      <option value="Not Graduate">Not Graduate</option>
                    </select>
                    <select
                      value={formData.self_employed}
                      onChange={(e) => setFormData({ ...formData, self_employed: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="No">Employed</option>
                      <option value="Yes">Self-Employed</option>
                    </select>
                    <select
                      value={formData.property_area}
                      onChange={(e) => setFormData({ ...formData, property_area: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    >
                      {propertyAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Financial Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-cyan-600" /> Financial Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="number"
                      value={formData.applicant_income}
                      onChange={(e) => setFormData({ ...formData, applicant_income: parseInt(e.target.value) })}
                      placeholder="Applicant Income"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="number"
                      value={formData.coapplicant_income}
                      onChange={(e) => setFormData({ ...formData, coapplicant_income: parseInt(e.target.value) })}
                      placeholder="Co-applicant Income"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="number"
                      value={formData.loan_amount}
                      onChange={(e) => setFormData({ ...formData, loan_amount: parseInt(e.target.value) })}
                      placeholder="Loan Amount (in thousands)"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="number"
                      value={formData.loan_amount_term}
                      onChange={(e) => setFormData({ ...formData, loan_amount_term: parseInt(e.target.value) })}
                      placeholder="Loan Term (months)"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    />
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="credit_history"
                          value={1}
                          checked={formData.credit_history === 1}
                          onChange={(e) => setFormData({ ...formData, credit_history: parseInt(e.target.value) })}
                        />
                        Good Credit
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="credit_history"
                          value={0}
                          checked={formData.credit_history === 0}
                          onChange={(e) => setFormData({ ...formData, credit_history: parseInt(e.target.value) })}
                        />
                        No Credit
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Landmark className="w-5 h-5" />
                        Check Loan Eligibility
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            {prediction ? (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-8">
                <div className={`px-6 py-5 ${prediction.status === 'Approved' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-red-600 to-red-700'}`}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {prediction.status === 'Approved' ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        Loan Approved
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6" />
                        Loan Denied
                      </>
                    )}
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Decision</p>
                    <div className={`px-6 py-4 rounded-xl ${prediction.status === 'Approved' ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-red-50 border-2 border-red-200'}`}>
                      <p className={`text-2xl font-bold text-center ${prediction.status === 'Approved' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {prediction.status === 'Approved' ? 'APPROVED' : 'NOT APPROVED'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Risk Assessment</p>
                    <div className={`px-4 py-3 rounded-lg ${getRiskColor(prediction.status === 'Approved' ? 'Low' : 'High')}`}>
                      <p className="text-center font-semibold">{prediction.status === 'Approved' ? 'Low Risk' : 'High Risk'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Loan-to-Income Ratio</p>
                    <div className="bg-slate-50 px-4 py-3 rounded-lg">
                      <p className="text-2xl font-bold text-center text-slate-900">{(formData.loan_amount / (formData.applicant_income + formData.coapplicant_income)).toFixed(2)}x</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Model Confidence</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 overflow-hidden h-3 text-xs flex rounded-full bg-slate-200">
                        <div
                          style={{ width: `${prediction.confidence}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${prediction.status === 'Approved' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
                        />
                      </div>
                      <span className="text-lg font-semibold text-slate-900">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center sticky top-8">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Landmark className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 text-sm">Complete the form and click "Check Loan Eligibility" to see the approval decision</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
