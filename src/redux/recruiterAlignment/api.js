import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getRecruiterAlignmentApi = params =>
  DataService.get('backend', endPoints.recruiterAlignment.recruiterAlignment, params).then(response => response.data);

export const getRecruiterAssignmentsApi = params =>
  DataService.post('backend', endPoints.recruiterAlignment.recruiterAssignments, params).then(
    response => response.data,
  );
