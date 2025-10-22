// Mock data for the clearance system dashboard

export const studentData = {
  name: "Mubarak",
  department: "Computer Science",
  session: "2024/2025 Academic Session",
  clearanceProgress: 75,
  notifications: 3,
};

export const clearanceStats = [
  {
    id: 1,
    title: "Documents Uploaded",
    value: "4 / 6",
    subtitle: "Required Documents",
    progress: 67,
    color: "purple",
  },
  {
    id: 2,
    title: "Eligibility Status",
    value: "Eligible",
    subtitle: "Assessment Complete",
    color: "green",
  },
  {
    id: 3,
    title: "Departments Cleared",
    value: "3 / 5",
    subtitle: "Clearance Progress",
    progress: 60,
    color: "blue",
  },
];

export const recommendedCourses = [
  {
    id: 1,
    courseName: "Computer Science",
    department: "Faculty of Computing",
    isEligible: true,
  },
  {
    id: 2,
    courseName: "Industrial Chemistry",
    department: "Faculty of Science",
    isEligible: false,
  },
  {
    id: 3,
    courseName: "Business Administration",
    department: "Faculty of Management",
    isEligible: true,
  },
  {
    id: 4,
    courseName: "Mass Communication",
    department: "Faculty of Arts",
    isEligible: true,
  },
];

export const notifications = [
  {
    id: 1,
    type: "success",
    title: "WAEC Result Verified",
    message: "Your WAEC result has been successfully verified and approved.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    title: "JAMB Result Required",
    message: "Please upload your JAMB result for review and verification.",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "info",
    title: "Eligibility Result Ready",
    message: "Your eligibility assessment is complete. Check your status.",
    time: "2 days ago",
  },
];
