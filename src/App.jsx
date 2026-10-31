import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Organizer pages
import { OrganizerDashboard } from './pages/organizer/OrganizerDashboard';
import { CampaignsPage } from './pages/organizer/CampaignsPage';
import { CreateCampaignPage } from './pages/organizer/CreateCampaignPage';
import { CampaignDetailsPage } from './pages/organizer/CampaignDetailsPage';
import { TasksPage } from './pages/organizer/TasksPage';
import { UnassignedTasksPage } from './pages/organizer/UnassignedTasksPage';
import { VolunteersPage } from './pages/organizer/VolunteersPage';
import { OrganizerProfile } from './pages/organizer/OrganizerProfile';
import { OrganizerSettings } from './pages/organizer/OrganizerSettings';

// Volunteer pages
import { VolunteerDashboard } from './pages/volunteer/VolunteerDashboard';
import { VolunteerCampaignsPage } from './pages/volunteer/VolunteerCampaignsPage';
import { VolunteerCampaignDetailsPage } from './pages/volunteer/VolunteerCampaignDetailsPage';
import { AvailableTasksPage } from './pages/volunteer/AvailableTasksPage';
import { MyTasksPage } from './pages/volunteer/MyTasksPage';
import { VolunteerProfile } from './pages/volunteer/VolunteerProfile';
import { VolunteerSettings } from './pages/volunteer/VolunteerSettings';

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Organizer Routes */}
              <Route
                path="/organizer/dashboard"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/campaigns"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <CampaignsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/campaigns/new"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <CreateCampaignPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/campaigns/:id"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <CampaignDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/tasks"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/unassigned"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <UnassignedTasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/volunteers"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <VolunteersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/profile"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <OrganizerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/settings"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <OrganizerSettings />
                  </ProtectedRoute>
                }
              />

              {/* Volunteer Routes */}
              <Route
                path="/volunteer/dashboard"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <VolunteerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/campaigns"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <VolunteerCampaignsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/campaigns/:id"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <VolunteerCampaignDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/available-tasks"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <AvailableTasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/my-tasks"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <MyTasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/profile"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <VolunteerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/settings"
                element={
                  <ProtectedRoute allowedRole="volunteer">
                    <VolunteerSettings />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
