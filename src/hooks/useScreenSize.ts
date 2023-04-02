import { useEffect, useState } from 'react';
import { screenSizes } from 'src/constants';

export const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < screenSizes.md);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= screenSizes.md && window.innerWidth < screenSizes.lg
  );
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= screenSizes.lg
  );

  useEffect(() => {
    const mediaMobile = window.matchMedia(
      `(max-width: ${screenSizes.md - 1}px)`
    );
    const mediaTablet = window.matchMedia(
      `(min-width: ${screenSizes.md}px) and (max-width: ${screenSizes.lg}px)`
    );
    const mediaDesktop = window.matchMedia(`(min-width: ${screenSizes.lg}px)`);

    if (mediaMobile.matches !== isMobile) {
      setIsMobile(mediaMobile.matches);
    }
    if (mediaTablet.matches !== isTablet) {
      setIsTablet(mediaTablet.matches);
    }
    if (mediaDesktop.matches !== isDesktop) {
      setIsDesktop(mediaDesktop.matches);
    }

    const onChange = () => {
      setIsMobile(mediaMobile.matches);
      setIsTablet(mediaTablet.matches);
      setIsDesktop(mediaDesktop.matches);
    };

    mediaMobile.addEventListener('change', onChange);
  }, [isMobile, isTablet, isDesktop]);

  return { isMobile, isTablet, isDesktop };
};
