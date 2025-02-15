import { getRequest } from '@/services/api';
import { ProfileData } from '../_types';

const getUserProfileInfo = async () =>
  getRequest<null, ProfileData>({
    endpoint: '/employee_profile',
    tags: ['profile'],
  });

export { getUserProfileInfo };
