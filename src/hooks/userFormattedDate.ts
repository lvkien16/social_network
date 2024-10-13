import { useCallback } from 'react';
import moment from 'moment';

export const useFormattedDate = () => {
  const formatDate = useCallback((date: string | Date, format: string = 'MMMM DD, YYYY'): string => {
    return moment(date).format(format);
  }, []);

  return formatDate;
};

