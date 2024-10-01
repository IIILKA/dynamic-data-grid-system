import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import useTheme from '../../core/hooks/theme-hook.ts';
import { selectIsLoading } from '../../loading/loading-slice.ts';

export default function useHeaderLoader() {
  const { isDarkTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined;
    if (isLoading) {
      setIsVisible(true);
    } else {
      handler = setTimeout(() => setIsVisible(false), 5000);
    }

    return () => {
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [isLoading]);

  return { isDarkTheme, isVisible, isLoading };
}
