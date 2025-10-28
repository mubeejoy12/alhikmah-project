import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { useClearance } from '../hooks/useClearance';
import { BookOpen, CheckCircle, Star, Users, Clock } from 'lucide-react';

const CourseRecommendation = () => {
  const { updateRecommendation, setRecommendedCourse } = useClearance();
  const [appliedCourses, setAppliedCourses] = useState(new Set());

  // Mock course recommendations data
  const courseRecommendations = [
    {
      id: 1,
      name: 'Computer Science',
      department: 'Faculty of Computing',
      description: 'Study of computational systems and programming',
      eligibilityScore: 95,
      duration: '4 years',
      capacity: 120,
      requirements: ['Mathematics', 'Physics', 'English'],
      careerProspects: ['Software Developer', 'Data Scientist', 'System Analyst'],
      reason: 'Your strong performance in mathematics and logical reasoning makes you an excellent candidate for Computer Science.',
      isRecommended: true,
      difficulty: 'Medium',
      jobMarket: 'Excellent',
    },
    {
      id: 2,
      name: 'Industrial Chemistry',
      department: 'Faculty of Science',
      description: 'Application of chemistry in industrial processes',
      eligibilityScore: 88,
      duration: '4 years',
      capacity: 80,
      requirements: ['Chemistry', 'Mathematics', 'Physics'],
      careerProspects: ['Chemical Engineer', 'Quality Analyst', 'Research Scientist'],
      reason: 'Your chemistry background and analytical skills align well with this program.',
      isRecommended: true,
      difficulty: 'High',
      jobMarket: 'Good',
    },
    {
      id: 3,
      name: 'Business Administration',
      department: 'Faculty of Management',
      description: 'Comprehensive business and management education',
      eligibilityScore: 82,
      duration: '4 years',
      capacity: 150,
      requirements: ['English', 'Mathematics', 'Economics'],
      careerProspects: ['Business Analyst', 'Project Manager', 'Entrepreneur'],
      reason: 'Your leadership potential and communication skills are valuable for business roles.',
      isRecommended: false,
      difficulty: 'Medium',
      jobMarket: 'Very Good',
    },
    {
      id: 4,
      name: 'Mass Communication',
      department: 'Faculty of Arts',
      description: 'Media, journalism, and communication studies',
      eligibilityScore: 78,
      duration: '4 years',
      capacity: 100,
      requirements: ['English', 'Literature', 'Social Studies'],
      careerProspects: ['Journalist', 'Media Producer', 'Public Relations'],
      reason: 'Your communication skills and interest in media make this a suitable option.',
      isRecommended: false,
      difficulty: 'Low',
      jobMarket: 'Good',
    },
  ];

  const handleApply = (courseId) => {
    setAppliedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
        
        // Update clearance progress when applying to a course
        const course = courseRecommendations.find(c => c.id === courseId);
        if (course) {
          updateRecommendation('completed');
          setRecommendedCourse(course.name);
        }
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getJobMarketColor = (market) => {
    switch (market) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Very Good': return 'text-blue-600 bg-blue-100';
      case 'Good': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <PageLayout 
      title="Course Recommendations" 
      subtitle="Discover courses that match your academic profile and career goals"
    >
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4</h3>
            <p className="text-gray-600">Recommended Courses</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{appliedCourses.size}</h3>
            <p className="text-gray-600">Applications Sent</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
            <p className="text-gray-600">Best Match Score</p>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {courseRecommendations.map((course) => (
            <Card key={course.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                    {course.isRecommended && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{course.department}</p>
                  <p className="text-gray-700">{course.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{course.eligibilityScore}%</div>
                  <div className="text-sm text-gray-600">Match Score</div>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Capacity: {course.capacity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobMarketColor(course.jobMarket)}`}>
                    {course.jobMarket} Job Market
                  </span>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.requirements.map((req, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Prospects */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Career Prospects:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.careerProspects.map((career, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendation Reason */}
              <div className="bg-purple-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-purple-900 mb-2">Why This Course?</h4>
                <p className="text-purple-700">{course.reason}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleApply(course.id)}
                  variant={appliedCourses.has(course.id) ? 'success' : 'primary'}
                  className="flex-1"
                >
                  {appliedCourses.has(course.id) ? 'Applied ✓' : 'Apply Now'}
                </Button>
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Application Summary */}
        {appliedCourses.size > 0 && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Summary</h3>
            <div className="space-y-3">
              {Array.from(appliedCourses).map(courseId => {
                const course = courseRecommendations.find(c => c.id === courseId);
                return (
                  <div key={courseId} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-gray-900">{course.name}</span>
                    </div>
                    <span className="text-sm text-green-600">Applied</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button size="large" className="w-full">
                Submit Applications
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default CourseRecommendation;
