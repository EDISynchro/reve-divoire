import './App.css';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import Presentation from './components/Valeurs';
import Footer from './components/Footer';

import { Routes, Route, useLocation } from 'react-router-dom';
import AboutPage from './pages/About/AboutPage';
import ActionsPage from './pages/Actions/ActionsPage';
import Frip2RevePage from './pages/Frip2Reve/Frip2RevePage';
import ActualitesPage from './pages/actualites/ActualitesPage';
import DonPage from './pages/don/DonPage';
import ContactPage from './pages/contact/ContactPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import Home from './pages/Home';

function App() {
  const location = useLocation();

  const hideTopNav = location.pathname === '/dashboard';

  return (
    <div className="App font-sans text-gray-800">
      {!hideTopNav && <TopNav />}

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/actions" element={<ActionsPage />} />
          <Route path="/frip2reve" element={<Frip2RevePage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/don" element={<DonPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
