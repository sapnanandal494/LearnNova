import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Components & Pages
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';
import AuthModal from './components/public/AuthModal';
import SearchModal from './components/public/SearchModal';
import LandingPage from './pages/public/LandingPage';
import CourseCatalogPage from './pages/public/CourseCatalogPage';
import ExpertLecturesPage from './pages/public/ExpertLecturesPage';
import PublicStudyMaterialsPage from './pages/public/PublicStudyMaterialsPage';
import ContactPage from './pages/public/ContactPage';

// Dashboard Components & Pages
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import DashboardCoursesPage from './pages/dashboard/DashboardCoursesPage';
import DashboardAssignmentsPage from './pages/dashboard/DashboardAssignmentsPage';
import DashboardQuizzesPage from './pages/dashboard/DashboardQuizzesPage';
import DashboardMaterialsPage from './pages/dashboard/DashboardMaterialsPage';
import DashboardAIAssistantPage from './pages/dashboard/DashboardAIAssistantPage';
import DashboardTimetablePage from './pages/dashboard/DashboardTimetablePage';
import DashboardAttendancePage from './pages/dashboard/DashboardAttendancePage';
import DashboardAnalyticsPage from './pages/dashboard/DashboardAnalyticsPage';
import DashboardSettingsPage from './pages/dashboard/DashboardSettingsPage';

// Admin Pages (standalone – no public layout)
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Not Found Page
import NotFoundPage from './pages/NotFoundPage';

// Public Layout Wrapper
function PublicLayout({ onOpenSearch }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar onOpenSearch={onOpenSearch} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout onOpenSearch={() => setIsSearchOpen(true)} />}>
            <Route path="/" element={<LandingPage onOpenSearch={() => setIsSearchOpen(true)} />} />
            <Route path="/home" element={<LandingPage onOpenSearch={() => setIsSearchOpen(true)} />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/expert-lectures" element={<ExpertLecturesPage />} />
            <Route path="/study-materials" element={<PublicStudyMaterialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Student Dashboard Portal Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="courses" element={<DashboardCoursesPage />} />
            <Route path="assignments" element={<DashboardAssignmentsPage />} />
            <Route path="quizzes" element={<DashboardQuizzesPage />} />
            <Route path="materials" element={<DashboardMaterialsPage />} />
            <Route path="notes" element={<DashboardMaterialsPage />} />
            <Route path="ai-assistant" element={<DashboardAIAssistantPage />} />
            <Route path="timetable" element={<DashboardTimetablePage />} />
            <Route path="attendance" element={<DashboardAttendancePage />} />
            <Route path="analytics" element={<DashboardAnalyticsPage />} />
            <Route path="progress-and-analytics" element={<DashboardAnalyticsPage />} />
            <Route path="settings" element={<DashboardSettingsPage />} />
            <Route path="lectures" element={<DashboardCoursesPage />} />
            <Route path="daily-lectures" element={<DashboardCoursesPage />} />
            <Route path="notifications" element={<DashboardHomePage />} />
          </Route>

          {/* Admin Panel Routes (standalone – no Navbar/Footer) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Modals */}
        <AuthModal />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </BrowserRouter>
    </AuthProvider>
  );
}
