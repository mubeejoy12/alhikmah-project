import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Send,
  Bell,
  FileText,
  Users,
  HelpCircle
} from 'lucide-react';

const HelpSupport = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock notices data
  const notices = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      content: 'The clearance system will be under maintenance on January 20th, 2024 from 2:00 AM to 6:00 AM.',
      type: 'maintenance',
      date: '2024-01-15',
      priority: 'high',
    },
    {
      id: 2,
      title: 'New Document Requirements',
      content: 'Starting from February 1st, 2024, all applicants must submit a valid passport photograph along with other required documents.',
      type: 'update',
      date: '2024-01-10',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Eligibility Check Process Updated',
      content: 'The eligibility assessment process has been improved for faster processing. Results will now be available within 24 hours.',
      type: 'improvement',
      date: '2024-01-08',
      priority: 'low',
    },
  ];

  const supportChannels = [
    {
      name: 'Phone Support',
      icon: Phone,
      description: 'Call us for immediate assistance',
      contact: '+234 123 456 7890',
      availability: 'Mon-Fri: 8AM-6PM',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      name: 'Email Support',
      icon: Mail,
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@alhikmah.edu.ng',
      availability: '24/7',
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Live Chat',
      icon: MessageCircle,
      description: 'Chat with our support team in real-time',
      contact: 'Available on website',
      availability: 'Mon-Fri: 9AM-5PM',
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  const faqs = [
    {
      question: 'How long does the clearance process take?',
      answer: 'The clearance process typically takes 3-5 business days after all required documents are submitted and verified.',
    },
    {
      question: 'What documents are required for clearance?',
      answer: 'You need to upload your WAEC result, JAMB result, birth certificate, and a recent passport photograph.',
    },
    {
      question: 'Can I check my eligibility status online?',
      answer: 'Yes, you can check your eligibility status anytime by logging into your account and visiting the Eligibility Status page.',
    },
    {
      question: 'What if my documents are rejected?',
      answer: 'If your documents are rejected, you will receive an email with the reason for rejection and instructions on how to resubmit.',
    },
    {
      question: 'How do I contact the admissions office?',
      answer: 'You can contact the admissions office via phone (+234 123 456 7890), email (admissions@alhikmah.edu.ng), or visit in person.',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Integrate with backend API
    // await apiClient.post('/support/contact', contactForm);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your message has been sent successfully! We\'ll get back to you soon.');
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
    }, 2000);
  };

  const getNoticeIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'update':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'improvement':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <PageLayout 
      title="Help & Support" 
      subtitle="Get assistance with your clearance process and find answers to common questions"
    >
      <div className="space-y-6">
        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.name}</h3>
                <p className="text-gray-600 mb-3">{channel.description}</p>
                <p className="font-medium text-gray-900 mb-1">{channel.contact}</p>
                <p className="text-sm text-gray-500">{channel.availability}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What is this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={contactForm.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your issue or question..."
                />
              </div>
              
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </Button>
            </form>
          </Card>

          {/* Recent Notices */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Notices</h3>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    {getNoticeIcon(notice.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{notice.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                          {notice.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notice.content}</p>
                      <p className="text-xs text-gray-500">{notice.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Notices
            </Button>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Download Guide</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Join Community</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Get Notifications</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Report Bug</span>
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HelpSupport;
