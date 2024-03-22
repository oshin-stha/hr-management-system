export const FORM_ERRORS = {
  employeeId: {
    required: 'Employee ID is required',
  },
  firstName: {
    required: 'First Name is required',
  },
  lastName: {
    required: 'Last Name is required',
  },
  gender: {
    required: 'Gender is required',
  },
  contactNumber: {
    required: 'Contact Number is required',
    minlength: 'Contact Number must be at least 10 digits',
    maxlength: 'Contact Number must not exceed 10 digits',
  },
  address: {
    required: 'Address is required',
  },
  dateOfBirth: {
    required: 'Date of Birth is required',
  },
  citizenshipNumber: {
    required: 'Citizenship Number is required',
  },
  startDate: {
    required: 'Start Date is required',
  },
  department: {
    required: 'Department is required',
  },
  role: {
    required: 'Role is required',
  },
  designation: {
    required: 'Designation is required',
  },
  email: {
    required: 'Email is required',
    email: 'Invalid Email',
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 digits',
  },
};
export const LEAVE_OVERVIEW_ERRORS = {
  LEAVE_BALANCE_ERROR: 'Leave balance document does not exist',
  INVALID_LEAVE: 'Invalid leave type',
};
