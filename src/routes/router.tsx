import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { Home } from '../pages/Home';
import { AboutPomodoro } from '../pages/AboutPomodoro';
import { NotFound } from '../pages/NotFoundPage';
import { useEffect } from 'react';

function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({top: 0});
  }, [pathname]);

  return null;
}

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-pomodoro' element={<AboutPomodoro />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <ScrollTop />
      </BrowserRouter>
    </>
  );
}
