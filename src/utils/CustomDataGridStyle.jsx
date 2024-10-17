const styles = {
  table: {},
  cell: {
    padding: '10px',
  },
  newStatus: {
    backgroundColor: '#1B5198',
    border: '1px solid #1B5198',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  activeStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #4CAF50',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },
  cancelledStatus: {
    backgroundColor: '#FA5A16',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  declinedStatus: {
    backgroundColor: '#E54C0B',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  rejectedStatus: {
    backgroundColor: '#FA5A16',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  appliedStatus: {
    backgroundColor: '#FAAD14',
    border: '1px solid #FAAD14',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },
  updatedStatus: {
    backgroundColor: '#8F00FF',
    border: '1px solid #8F00FF',
    borderRadius: '16px',
    padding: '1px 8px',
  },
  approvedStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #4CAF50',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },
  jobOfferedStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #4CAF50',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },

  jobOfferedAcceptedStatus: {
    backgroundColor: '#1b99dd',
    border: '1px solid #1b99dd',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },

  inprogressStatus: {
    backgroundColor: '#557056',
    border: '1px solid #557056',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  completedStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #4CAF50',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingStatus: {
    backgroundColor: '#147AFF',
    border: '1px solid #147AFF',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingScheduledStatus: {
    backgroundColor: '#147AFF',
    border: '1px solid #147AFF',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingFailStatus: {
    backgroundColor: '#E54C0B',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  interviewingPassStatus: {
    backgroundColor: '#7b8ad1',
    border: '1px solid #7b8ad1',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },
  selectedRow: {
    backgroundColor: '#D7E8FF',
  },


  proposalSentStatus: {
    backgroundColor: '#FAAD14',
    border: '1px solid #FAAD14',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },

  proposalAcceptStatus: {
    backgroundColor: '#4CAF50',
    border: '1px solid #4CAF50',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'black'
  },

  proposalDeclineStatus: {
    backgroundColor: '#E54C0B',
    border: '1px solid #E54C0B',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },

  interviewingDeclinedStatus: {
    backgroundColor: '#101010',
    border: '1px solid #101010',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },

  interviewingSuggestedStatus: {
    backgroundColor: '#659c9f',
    border: '1px solid #659c9f',
    borderRadius: '16px',
    padding: '1px 8px',
    color: 'white'
  },

  default: {},
};

export const getStatusStyle = (status) => {

  switch (status) {
    case 'temporary':
      return styles.newStatus;
    case 'permanent':
      return styles.activeStatus;
    case 'new':
    case 'New':
      return styles.newStatus;
    case 'active':
      return styles.activeStatus;
    case 'cancelled':
      return styles.cancelledStatus;
    case 'declined':
      return styles.declinedStatus;
    case 'applied':
      return styles.appliedStatus;
    case 'updated':
      return styles.updatedStatus;
    case 'approved':
      return styles.approvedStatus;
    case 'accepted':
      return styles.approvedStatus;
    case 'hired':
      return styles.approvedStatus;
    case 'need_check_in':
      return styles.appliedStatus;
    case 'check_in':
      return styles.approvedStatus;
    case 'paid':
      return styles.approvedStatus;
    case 'working':
      return styles.approvedStatus;
    case 'phone':
      return styles.newStatus;
    case 'personal':
      return styles.appliedStatus;
    case 'fail':
      return styles.cancelledStatus;
    case 'rejected':
      return styles.rejectedStatus;
    case 'done':
      return styles.jobOfferedAcceptedStatus;
    case 'offer_accepted':
      return styles.jobOfferedAcceptedStatus;
    case 'job_offered':
      return styles.jobOfferedStatus;
    case 'proposal_sent':
      return styles.proposalSentStatus;
    case 'proposal':
      return styles.proposalSentStatus;
    case 'proposal_accepted':
      return styles.proposalAcceptStatus;
    case 'proposal_decline':
      return styles.proposalDeclineStatus;
    case 'inprogress':
      return styles.inprogressStatus;
    case 'completed':
      return styles.completedStatus;
    case 'interviewing':
      return styles.interviewingStatus;
    case 'interview_passed':
    case 'interview_pass':
      return styles.interviewingPassStatus;
    case 'interviewing_passed':
      return styles.interviewingPassStatus;
    case 'interviewing_failed':
    case 'interview_fail':
      return styles.interviewingFailStatus;
    case 'scheduled':
    case 'interviewing_scheduled':
      return styles.interviewingScheduledStatus;
    case 'suggested':
    case 'interviewing_scheduled_suggested':
      return styles.interviewingSuggestedStatus;
    case 'interview_declined':
      return styles.interviewingDeclinedStatus;
    case 'pass':
      return styles.interviewingStatus;
    case 'offer_accepted':
      return styles.interviewingStatus;
    default:
      return styles.default;
  }
};
