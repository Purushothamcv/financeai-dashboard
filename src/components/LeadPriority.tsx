import { useState } from 'react';
import { TrendingUp, Building2, DollarSign, Users, BarChart3, CheckCircle } from 'lucide-react';

interface LeadFormData {
  annual_revenue__m__: number;
  leads_generated: number;
  conversion_rate____: number;
  total_purchases_last_year: number;
  frequency_num: number;
  industry: string;
  company_size: string;
  campaign_type: string;
  region: string;
  district: string;
  contract_status: string;
  payment_behavior: string;
  preferred_channel: string;
}

interface PredictionResult {
  priority: 'High' | 'Medium' | 'Low';
  score: number;
  confidence: number;
}

const API_URL = 'http://localhost:8000/predict-lead-priority'; // <-- Correct backend URL

export default function LeadPriority() {
  const [formData, setFormData] = useState<LeadFormData>({
    annual_revenue__m__: 10.5,
    leads_generated: 20,
    conversion_rate____: 0.8,
    total_purchases_last_year: 15,
    frequency_num: 2,
    industry: 'Mining, metals & minerals',
    company_size: 'Medium',
    campaign_type: 'SEM',
    region: 'Adana',
    district: 'Ceyhan',
    contract_status: 'Pending',
    payment_behavior: 'On-time',
    preferred_channel: 'Sales Rep',
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const industries = [
    'Mining, metals & minerals',
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Energy',
    'Telecommunications',
  ];

  const companySizes = ['Small', 'Medium', 'Large', 'Enterprise'];
  const campaignTypes = ['SEM', 'SEO', 'Social Media', 'Email', 'Direct Mail', 'Events'];
  const contractStatuses = ['Active', 'Pending', 'Expired', 'Negotiating'];
  const paymentBehaviors = ['On-time', 'Delayed', 'Irregular', 'Early'];
  const preferredChannels = ['Sales Rep', 'Email', 'Phone', 'Portal', 'Partner'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const result = await response.json();
      // Map backend response to PredictionResult type
      setPrediction({
        priority: result.Lead_Priority || 'Low',
        score: result.score ?? 0, // Use 0 if not provided
        confidence: result.confidence ?? 0, // Use 0 if not provided
      });
    } catch (error) {
      setPrediction(null);
      // Optionally handle error (e.g., show a message)
    }

    setIsLoading(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Low': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Lead Priority Assessment
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Advanced ML-powered analysis to determine lead priority and optimize your sales strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Building2 className="w-6 h-6" />
                  Company Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      Financial Metrics
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Annual Revenue (M)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.annual_revenue__m__}
                          onChange={(e) => setFormData({ ...formData, annual_revenue__m__: parseFloat(e.target.value) })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Total Purchases (Last Year)
                        </label>
                        <input
                          type="number"
                          value={formData.total_purchases_last_year}
                          onChange={(e) => setFormData({ ...formData, total_purchases_last_year: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Performance Metrics
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Leads Generated
                        </label>
                        <input
                          type="number"
                          value={formData.leads_generated}
                          onChange={(e) => setFormData({ ...formData, leads_generated: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Conversion Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.conversion_rate____}
                          onChange={(e) => setFormData({ ...formData, conversion_rate____: parseFloat(e.target.value) })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Engagement Frequency
                        </label>
                        <input
                          type="number"
                          value={formData.frequency_num}
                          onChange={(e) => setFormData({ ...formData, frequency_num: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Company Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Industry
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          {industries.map(ind => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Company Size
                        </label>
                        <select
                          value={formData.company_size}
                          onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          {companySizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Campaign Type
                        </label>
                        <select
                          value={formData.campaign_type}
                          onChange={(e) => setFormData({ ...formData, campaign_type: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          {campaignTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Contract Status
                        </label>
                        <select
                          value={formData.contract_status}
                          onChange={(e) => setFormData({ ...formData, contract_status: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          {contractStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Payment Behavior
                        </label>
                        <select
                          value={formData.payment_behavior}
                          onChange={(e) => setFormData({ ...formData, payment_behavior: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          {paymentBehaviors.map(behavior => (
                            <option key={behavior} value={behavior}>{behavior}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Preferred Channel
                        </label>
                        <select
                          value={formData.preferred_channel}
                          onChange={(e) => setFormData({ ...formData, preferred_channel: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          {preferredChannels.map(channel => (
                            <option key={channel} value={channel}>{channel}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          Analyze Lead Priority
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            {prediction ? (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Analysis Results
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Lead Priority</p>
                    <div className={`px-6 py-4 rounded-xl border-2 ${getPriorityColor(prediction.priority)}`}>
                      <p className="text-3xl font-bold text-center">{prediction.priority}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Priority Score</p>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-slate-900">
                            {typeof prediction.score === 'number' ? prediction.score.toFixed(1) : 'N/A'}
                          </span>
                          <span className="text-slate-600"> / 100</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-4 text-xs flex rounded-full bg-slate-200">
                        <div
                          style={{ width: `${prediction.score}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-3">Model Confidence</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 overflow-hidden h-3 text-xs flex rounded-full bg-slate-200">
                        <div
                          style={{ width: `${prediction.confidence}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-emerald-600"
                        />
                      </div>
                      <span className="text-lg font-semibold text-slate-900">
                        {typeof prediction.confidence === 'number' ? prediction.confidence + '%' : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {prediction.priority === 'High' && (
                        <>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-emerald-600 mt-0.5">✓</span>
                            <span>Prioritize immediate follow-up</span>
                          </li>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-emerald-600 mt-0.5">✓</span>
                            <span>Assign senior sales representative</span>
                          </li>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-emerald-600 mt-0.5">✓</span>
                            <span>Schedule executive presentation</span>
                          </li>
                        </>
                      )}
                      {prediction.priority === 'Medium' && (
                        <>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">✓</span>
                            <span>Schedule follow-up within 48 hours</span>
                          </li>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">✓</span>
                            <span>Nurture through targeted campaigns</span>
                          </li>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">✓</span>
                            <span>Monitor engagement metrics</span>
                          </li>
                        </>
                      )}
                      {prediction.priority === 'Low' && (
                        <>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">✓</span>
                            <span>Add to automated nurture sequence</span>
                          </li>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">✓</span>
                            <span>Monitor for changes in engagement</span>
                          </li>
                          <li className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">✓</span>
                            <span>Review quarterly for re-scoring</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center sticky top-8">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 text-sm">
                  Complete the form and click "Analyze Lead Priority" to see the prediction results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
