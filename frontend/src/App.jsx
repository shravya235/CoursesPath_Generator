import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import OtpEntryPage from './pages/auth/OtpEntryPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivateRoute from './components/PrivateRoute';

// --- Import all the new path pages ---
import EngineeringPage from './pages/paths/EngineeringPage';
import MedicalPage from './pages/paths/MedicalPage';
import LawPage from './pages/paths/LawPage';
import BusinessPage from './pages/paths/BusinessPage';
import LogisticsPage from './pages/paths/LogisticsPage';
import PharmacyPage from './pages/paths/PharmacyPage';
import DesignPage from './pages/paths/DesignPage';
import PolicePage from './pages/paths/PolicePage';
import ArchitecturePage from './pages/paths/ArchitecturePage';
// --- ---

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-entry" element={<OtpEntryPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        {/* --- Add static routes for each path --- */}
        <Route path="/path/engineering" element={<EngineeringPage />} />
        <Route path="/path/medical" element={<MedicalPage />} />
        <Route path="/path/law" element={<LawPage />} />
        <Route path="/path/business" element={<BusinessPage />} />
        <Route path="/path/logistics" element={<LogisticsPage />} />
        <Route path="/path/pharmacy" element={<PharmacyPage />} />
        <Route path="/path/design" element={<DesignPage />} />
        <Route path="/path/police" element={<PolicePage />} />
        <Route path="/path/architecture" element={<ArchitecturePage />} />
        {/* --- --- */}

        {/* 2. Wrap the Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
