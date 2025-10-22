import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useClearance } from '../hooks/useClearance';
import { CheckCircle, XCircle, Clock, FileText, AlertTriangle, RefreshCw } from 'lucide-react';

const EligibilityStatus = () => {
  const { updateEligibility, setEligibilityStatus } = useClearance();
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState('2024-01-15T10:30:00Z');

  // Mock eligibility data
  const eligibilityData = {
    status: 'Eligible', // 'Eligible', 'Not Eligible', 'Pending'
    score: 85,
    criteria: [
      { name: 'Age Requirement', status: 'passed', score: 100 },
      { name: 'Academic Qualifications', status: 'passed', score: 90 },
      { name: 'Document Verification', status: 'passed', score: 85 },
      { name: 'Course Prerequisites', status: 'passed', score: 80 },
      { name: 'English Proficiency', status: 'passed', score: 75 },
    ],
    documents: [
      { name: 'WAEC Result', status: 'verified', uploaded: true },
      { name: 'JAMB Result', status: 'verified', uploaded: true },
      { name: 'Birth Certificate', status: 'verified', uploaded: true },
      { name: 'Passport Photo', status: 'pending', uploaded: false },
    ],
    recommendations: [
      'Consider applying for Computer Science program',
      'Your academic background is strong for STEM courses',
      'You may qualify for merit-based scholarships',
    ]
  };

  const handleCheckEligibility = async () => {
    setIsChecking(true);
    // TODO: Integrate with backend API
    // await apiClient.post('/eligibility/check');
    
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      setLastChecked(new Date().toISOString());
      
      // Update clearance progress
      updateEligibility('completed');
      setEligibilityStatus('Eligible');
      
      alert('Eligibility check completed!');
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Eligible':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Not Eligible':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Eligible':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Not Eligible':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <PageLayout 
      title="Eligibility Status" 
      subtitle="Check your admission eligibility and document verification status"
    >
      <div className="space-y-6">
        {/* Main Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {getStatusIcon(eligibilityData.status)}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Eligibility Status</h2>
                <p className="text-gray-600">Last checked: {new Date(lastChecked).toLocaleString()}</p>
              </div>
            </div>
            <Button
              onClick={handleCheckEligibility}
              loading={isChecking}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Check Eligibility</span>
            </Button>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${getStatusColor(eligibilityData.status)}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">{eligibilityData.status}</h3>
                <p className="text-lg">
                  {eligibilityData.status === 'Eligible' 
                    ? `Overall Score: ${eligibilityData.score}%`
                    : eligibilityData.status === 'Not Eligible'
                    ? 'Additional requirements needed'
                    : 'Assessment in progress'
                  }
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-600">{eligibilityData.score}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Eligibility Criteria */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
            <div className="space-y-4">
              {eligibilityData.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    {criterion.status === 'passed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium text-gray-900">{criterion.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-purple-600">{criterion.score}%</div>
                    <div className="text-xs text-gray-600">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Document Status */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Status</h3>
            <div className="space-y-4">
              {eligibilityData.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-600">
                        {doc.uploaded ? 'Uploaded' : 'Not uploaded'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'verified' 
                        ? 'bg-green-100 text-green-700'
                        : doc.status === 'pending'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        {eligibilityData.recommendations.length > 0 && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              {eligibilityData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="large" className="flex-1">
            Download Eligibility Report
          </Button>
          <Button variant="secondary" size="large" className="flex-1">
            View Detailed Assessment
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EligibilityStatus;
