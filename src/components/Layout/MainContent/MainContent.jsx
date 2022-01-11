import clsx from 'clsx';

import { useAuthContext } from 'context/AuthContext.jsx';

function MainContent({ children }) {
  const { isUserLoggedIn } = useAuthContext();
  return (
    <div className={clsx('section-main', isUserLoggedIn && 'section-main--logged')}>{children}</div>
  );
}

export default MainContent;
