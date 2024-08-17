import { useQuery } from '@tanstack/react-query';
import { get } from '../utils/request';
import { StatusResponse } from '../schema/status';

export function useStatus() {
  return useQuery<StatusResponse>({
    queryKey: ['status'],
    queryFn: async () => {
      const body = await get('/');
      return StatusResponse.parse(body);
    },
    retry: false,
  });
}
