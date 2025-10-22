/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'admin' | 'user'} role
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} AuthState
 * @property {User | null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} userId
 * @property {string} fileName
 * @property {string} fileUrl
 * @property {string} fileType
 * @property {number} fileSize
 * @property {'pending' | 'approved' | 'rejected' | 'under_review'} status
 * @property {Date} uploadedAt
 * @property {Date} [reviewedAt]
 * @property {string} [reviewedBy]
 * @property {string} [rejectionReason]
 */

/**
 * @typedef {Object} EligibilityCheck
 * @property {string} id
 * @property {string} userId
 * @property {'eligible' | 'not_eligible' | 'pending'} status
 * @property {Object} criteria
 * @property {boolean} criteria.age
 * @property {boolean} criteria.education
 * @property {boolean} criteria.experience
 * @property {boolean} criteria.documents
 * @property {Date} checkedAt
 * @property {string} [notes]
 */

/**
 * @typedef {Object} AdminReview
 * @property {string} id
 * @property {string} documentId
 * @property {string} adminId
 * @property {'approved' | 'rejected'} status
 * @property {string} comments
 * @property {Date} reviewedAt
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} data
 * @property {string} message
 * @property {string} [error]
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalUsers
 * @property {number} pendingDocuments
 * @property {number} approvedDocuments
 * @property {number} rejectedDocuments
 * @property {number} eligibleUsers
 */

// Export empty object to make this a valid module
export {};
