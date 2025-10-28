import React from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useClearance } from '../context/ClearanceContext';
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Shield, 
  Award, 
  BookOpen,
  RefreshCw,
  Download,
  Eye
} from 'lucide-react';

const ClearanceProgress = () => {
  const { state } = useClearance();

  const steps = [
    {
      id: 'upload',
      title: 'Document Upload',
      description: 'Upload your required documents (WAEC, JAMB, Birth Certificate)',
      icon: Upload,
      status: state.upload,
      details: `${state.documentsUploaded}/${state.totalDocuments} documents uploaded`,
    },
    {
      id: 'verification',
      title: 'Verification',
      description: 'Administrative review and verification of submitted documents',
      icon: Shield,
      status: state.verification,
      details: state.verificationStatus,
    },
    {
      id: 'eligibility',
      title: 'Eligibility Assessment',
      description: 'Academic eligibility check and course recommendation',
      icon: Award,
      status: state.eligibility,
      details: state.eligibilityStatus,
    },
    {
      id: 'recommendation',
      title: 'Course Recommendation',
      description: 'Final course recommendation and approval',
      icon: BookOpen,
      status: state.recommendation,
      details: state.recommendedCourse || 'Pending recommendation',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'pending':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'failed':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStepNumber = (index) => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    if (index < completedSteps) return '✓';
    if (index === completedSteps && steps[index].status === 'in-progress') return index + 1;
    return index + 1;
  };

  const handleRefresh = () => {
    // TODO: Integrate with backend API to refresh progress
    console.log('Refreshing clearance progress...');
  };

  const handleDownloadReport = () => {
    // TODO: Generate and download progress report
    console.log('Downloading progress report...');
  };

  return (
    <PageLayout 
      title="Clearance Progress" 
      subtitle="Track your admission clearance journey step by step"
    >
      <div className="space-y-6">
        {/* Overall Progress Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Overall Progress</h2>
              <p className="text-gray-600">Your clearance journey so far</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button
                variant="secondary"
                onClick={handleDownloadReport}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold text-purple-600">{state.overall}%</h3>
                <p className="text-gray-600">Complete</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {new Date(state.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${state.overall}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{state.documentsUploaded}</p>
                <p className="text-sm text-gray-600">Documents</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {steps.filter(step => step.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Steps Done</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {steps.filter(step => step.status === 'in-progress').length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {steps.filter(step => step.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Step-by-Step Progress */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Clearance Steps</h3>
          
          {steps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in-progress';
            const isPending = step.status === 'pending';
            
            return (
              <Card key={step.id} className={`p-6 transition-all duration-300 ${
                isInProgress ? 'ring-2 ring-purple-200 shadow-lg' : ''
              }`}>
                <div className="flex items-start space-x-4">
                  {/* Step Number/Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : isInProgress 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      getStepNumber(index)
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                        <span className="capitalize">{step.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{step.details}</p>

                    {/* Progress Bar for Current Step */}
                    {isInProgress && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {isCompleted && (
                        <Button variant="outline" size="small" className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                      )}
                      {isInProgress && (
                        <Button variant="primary" size="small" className="flex items-center space-x-2">
                          <RefreshCw className="h-4 w-4" />
                          <span>Check Status</span>
                        </Button>
                      )}
                      {isPending && (
                        <Button variant="outline" size="small" disabled>
                          Waiting...
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Current Status Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Status Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">Documents</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{state.documentsUploaded}/{state.totalDocuments}</p>
              <p className="text-sm text-gray-600">Uploaded</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Verification</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{state.verificationStatus}</p>
              <p className="text-sm text-gray-600">Status</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <Award className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">Eligibility</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{state.eligibilityStatus}</p>
              <p className="text-sm text-gray-600">Assessment</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">Recommendation</span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {state.recommendedCourse ? state.recommendedCourse : 'Pending'}
              </p>
              <p className="text-sm text-gray-600">Course</p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        {state.overall < 100 && (
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-3">
              {steps
                .filter(step => step.status === 'pending' || step.status === 'in-progress')
                .slice(0, 2)
                .map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <span className="text-sm font-bold">
                        {step.status === 'in-progress' ? '🔄' : index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.title}</p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default ClearanceProgress;
