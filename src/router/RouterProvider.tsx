import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface LocationShape {
  pathname: string;
  search: string;
  hash: string;
}

interface RouterContextValue {
  location: LocationShape;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

const getLocation = (): LocationShape => ({
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationShape>(() => getLocation());

  useEffect(() => {
    const handlePopState = () => {
      setLocation(getLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setLocation(getLocation());
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useRouter = (): RouterContextValue => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({ to, replace, onClick, children, ...anchorProps }) => {
  const { navigate } = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(to, { replace });
  };

  return (
    <a href={to} onClick={handleClick} {...anchorProps}>
      {children}
    </a>
  );
};

interface NavLinkProps extends LinkProps {
  isActive?: (pathname: string) => boolean;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  isActive,
  activeClassName,
  inactiveClassName,
  className,
  ...props
}) => {
  const {
    location: { pathname }
  } = useRouter();
  const active = isActive ? isActive(pathname) : pathname === props.to;
  const mergedClassName = [className, active ? activeClassName : inactiveClassName].filter(Boolean).join(' ');

  return <Link {...props} className={mergedClassName} />;
};

export const useSearchParams = (): URLSearchParams => {
  const {
    location: { search }
  } = useRouter();
  return useMemo(() => new URLSearchParams(search), [search]);
};
