import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useClearance } from '../hooks/useClearance';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

const UploadDocuments = () => {
  const { updateUpload, setDocuments } = useClearance();
  const [uploadedFiles, setUploadedFiles] = useState({
    waec: null,
    jamb: null,
    birthCertificate: null,
  });
  const [uploadProgress, setUploadProgress] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTypes = [
    {
      id: 'waec',
      name: 'WAEC Result',
      description: 'Upload your WAEC/SSCE result',
      required: true,
      acceptedTypes: '.pdf,.jpg,.jpeg,.png',
    },
    {
      id: 'jamb',
      name: 'JAMB Result',
      description: 'Upload your JAMB UTME result',
      required: true,
      acceptedTypes: '.pdf,.jpg,.jpeg,.png',
    },
    {
      id: 'birthCertificate',
      name: 'Birth Certificate',
      description: 'Upload your birth certificate',
      required: true,
      acceptedTypes: '.pdf,.jpg,.jpeg,.png',
    },
  ];

  const handleFileUpload = (documentType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
    
    // Simulate upload progress
    setUploadProgress(prev => ({
      ...prev,
      [documentType]: 0
    }));
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[documentType] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return {
          ...prev,
          [documentType]: current + 10
        };
      });
    }, 200);
  };

  const removeFile = (documentType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: null
    }));
    setUploadProgress(prev => ({
      ...prev,
      [documentType]: 0
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Integrate with backend API
    // await apiClient.post('/documents/upload', uploadedFiles);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Update clearance progress
      const uploadedCount = Object.values(uploadedFiles).filter(Boolean).length;
      updateUpload('completed');
      setDocuments(uploadedCount, 3);
      
      alert('Documents submitted for verification successfully!');
    }, 2000);
  };

  const allRequiredUploaded = documentTypes.every(doc => 
    doc.required ? uploadedFiles[doc.id] : true
  );

  return (
    <PageLayout 
      title="Upload Documents" 
      subtitle="Upload your required documents for clearance verification"
    >
      <div className="space-y-6">
        {/* Upload Status Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upload Status</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} / {documentTypes.length} documents uploaded
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documentTypes.map((doc) => (
              <div key={doc.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                {uploadedFiles[doc.id] ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
                <span className="text-sm font-medium text-gray-700">{doc.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Document Upload Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {documentTypes.map((doc) => (
            <Card key={doc.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                </div>
                {doc.required && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    Required
                  </span>
                )}
              </div>

              {uploadedFiles[doc.id] ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">
                        {uploadedFiles[doc.id].name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(doc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {uploadProgress[doc.id] < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Uploading...</span>
                        <span>{uploadProgress[doc.id]}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[doc.id]}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-300">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-3">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept={doc.acceptedTypes}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileUpload(doc.id, file);
                    }}
                    className="hidden"
                    id={`upload-${doc.id}`}
                  />
                  <label
                    htmlFor={`upload-${doc.id}`}
                    className="cursor-pointer inline-block"
                  >
                    <Button variant="outline" size="small">
                      Choose File
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Accepted: {doc.acceptedTypes}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Submit Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ready to Submit?</h3>
              <p className="text-gray-600">
                {allRequiredUploaded 
                  ? "All required documents have been uploaded. You can now submit for verification."
                  : "Please upload all required documents before submitting."
                }
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!allRequiredUploaded || isSubmitting}
              loading={isSubmitting}
              size="large"
            >
              Submit for Verification
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default UploadDocuments;
