import { role } from '../config/userRole';

export const SliceString = value => {
  if (value.length < 15) {
    return value;
  }
  return `${value.slice(0, 15)}...`;
};

export const isRecruiter = userRole => {
  if (userRole) {
    const recruiterRole = role.recruiter.toLowerCase();
    return userRole.toLowerCase() === recruiterRole;
  }
  return userRole;
};

export const isSalePerson = userRole => {
  if (userRole) {
    const salePersonRole = role.salesperson.toLowerCase();
    return userRole.toLowerCase() === salePersonRole;
  }
  return userRole;
};
