import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  // Mock student applications data
  const studentApplications = [
    {
      id: 1,
      name: 'Mubarak Ahmed',
      email: 'mubarak@alhikmah.edu.ng',
      department: 'Computer Science',
      applicationDate: '2024-01-15',
      status: 'Pending',
      documents: 4,
      eligibilityScore: 85,
      lastActivity: '2 hours ago',
      phone: '+234 123 456 7890',
    },
    {
      id: 2,
      name: 'Fatima Ibrahim',
      email: 'fatima@alhikmah.edu.ng',
      department: 'Industrial Chemistry',
      applicationDate: '2024-01-14',
      status: 'Approved',
      documents: 6,
      eligibilityScore: 92,
      lastActivity: '1 day ago',
      phone: '+234 123 456 7891',
    },
    {
      id: 3,
      name: 'Ahmad Yusuf',
      email: 'ahmad@alhikmah.edu.ng',
      department: 'Business Administration',
      applicationDate: '2024-01-13',
      status: 'Rejected',
      documents: 3,
      eligibilityScore: 65,
      lastActivity: '3 days ago',
      phone: '+234 123 456 7892',
    },
    {
      id: 4,
      name: 'Aisha Mohammed',
      email: 'aisha@alhikmah.edu.ng',
      department: 'Mass Communication',
      applicationDate: '2024-01-12',
      status: 'Pending',
      documents: 5,
      eligibilityScore: 78,
      lastActivity: '4 hours ago',
      phone: '+234 123 456 7893',
    },
    {
      id: 5,
      name: 'Omar Hassan',
      email: 'omar@alhikmah.edu.ng',
      department: 'Computer Science',
      applicationDate: '2024-01-11',
      status: 'Approved',
      documents: 6,
      eligibilityScore: 88,
      lastActivity: '2 days ago',
      phone: '+234 123 456 7894',
    },
  ];

  const stats = {
    total: studentApplications.length,
    pending: studentApplications.filter(app => app.status === 'Pending').length,
    approved: studentApplications.filter(app => app.status === 'Approved').length,
    rejected: studentApplications.filter(app => app.status === 'Rejected').length,
  };

  const filteredApplications = studentApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (studentId, newStatus) => {
    // TODO: Integrate with backend API
    console.log(`Changing status for student ${studentId} to ${newStatus}`);
    alert(`Status updated to ${newStatus}`);
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.size === filteredApplications.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredApplications.map(app => app.id)));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      case 'Pending':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <PageLayout 
      title="Admin Dashboard" 
      subtitle="Manage student applications and clearance processes"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Applications Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedStudents.size === filteredApplications.length && filteredApplications.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {getStatusIcon(student.status)}
                        <span className="ml-1">{student.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.documents}/6
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.eligibilityScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => console.log('View', student.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {student.status === 'Pending' && (
                          <>
                            <Button
                              variant="success"
                              size="small"
                              onClick={() => handleStatusChange(student.id, 'Approved')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="small"
                              onClick={() => handleStatusChange(student.id, 'Rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedStudents.size > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {selectedStudents.size} student(s) selected
                </span>
                <Button
                  variant="outline"
                  onClick={() => setSelectedStudents(new Set())}
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="success"
                  onClick={() => console.log('Bulk approve', Array.from(selectedStudents))}
                >
                  Approve Selected
                </Button>
                <Button
                  variant="danger"
                  onClick={() => console.log('Bulk reject', Array.from(selectedStudents))}
                >
                  Reject Selected
                </Button>
                <Button
                  variant="outline"
                  onClick={() => console.log('Bulk export', Array.from(selectedStudents))}
                >
                  Export Selected
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;