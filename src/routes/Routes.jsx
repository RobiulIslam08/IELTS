import { createBrowserRouter, Navigate } from 'react-router-dom';

import SocialCallback from '../components/common/SocialCallback';
import GoogleAnalytics from '../components/common/GoogleAnalytics';
// Layouts
import MainLayout from '../layout/MainLayout';
import PublicLayout from '../layout/PublicLayout';
import UserLayout from '../pages/user/UserLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import AboutUs from '../pages/public/AboutUs';
import Pricing from '../pages/public/Pricing';
import ContactUs from '../pages/public/ContactUs';
import TermsAndConditions from '../pages/public/TermsAndConditions';
import PolicyPage from '../pages/public/PolicyPage';

// Main Pages
import UserProfile from '../pages/user/UserProfile';
import NotFoundPage from '../pages/quizes/NotFoundPage';

// Components
import ProtectedRoute from '../components/common/ProtectedRoute';
import Courses from '../pages/user/couses/Courses';
import Payment from '../pages/payment/Payment';

import AllTestPage from '../pages/user/test/AllTestPage';
import TestDashboard from '../pages/user/test/TestDashboard';

import MockTestResults from '../pages/user/MockTestResults';
import MockTestDetails from '../pages/user/MockTestDetails';
import SkillSelection from '../pages/user/SkillSelection';

// Quiz Pages - Exam 02 Test 01
import ListeningOne from '../pages/quizes/exam02/test01/ListeningOne';
import WritingOne from '../pages/quizes/exam02/test01/WritingOne';
import WritingOneGeneral from '../pages/quizes/exam02/test01/WritingOneGeneral';
import ReadingOne from '../pages/quizes/exam02/test01/ReadingOne';
import ReadingOneAc from '../pages/quizes/exam02/test01/ReadingOneAc';

// Quiz Pages - Exam 02 Test 02
import ReadingTwo from '../pages/quizes/exam02/test02/ReadingTwo';
import ReadingTwoAc from '../pages/quizes/exam02/test02/ReadingTwoAc';
import WritingTwo from '../pages/quizes/exam02/test02/WritingTwo';
import WritingTwoGeneral from '../pages/quizes/exam02/test02/WritingTwoGeneral';
import ListeningTwo from '../pages/quizes/exam02/test02/ListeningTwo';

// Quiz Pages - Exam 02 Test 03
import ListeningThree from '../pages/quizes/exam02/test03/ListeningThree';
import ReadingThree from '../pages/quizes/exam02/test03/ReadingThree';
import WritingThree from '../pages/quizes/exam02/test03/WritingThree';

// Quiz Pages - Exam 02 Test 04
import ListeningFour from '../pages/quizes/exam02/test04/ListeningFour';
import ReadingFour from '../pages/quizes/exam02/test04/ReadingFour';
import WritingFour from '../pages/quizes/exam02/test04/WritingFour';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/user/user-profile" replace /> : children;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            // ─── Public pages (with Navbar + Footer) ─────────────────
            {
                element: <PublicLayout />,
                children: [
                    { index: true, element: <LandingPage /> },
                    { path: 'about', element: <AboutUs /> },
                    { path: 'pricing', element: <Pricing /> },
                    { path: 'contact', element: <ContactUs /> },
                    { path: 'terms-and-conditions', element: <TermsAndConditions /> },
                    { path: 'policy', element: <PolicyPage /> },
                ],
            },

            // ─── Auth routes (no public navbar) ──────────────────────
            {
                path: 'user/login',
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: 'social-login-callback',
                element: <SocialCallback />,
            },
            {
                path: 'user/register',
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },

            // ─── Protected exam routes ────────────────────────────────
            {
                path: 'user/ListeningOne/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ListeningOne />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/writingOne-academic/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <WritingOne />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/writingOne-general/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <WritingOneGeneral />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/writing-two-academic/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <WritingTwo />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/writing-two-general/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <WritingTwoGeneral />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/listening-two/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ListeningTwo />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/listening-three/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ListeningThree />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/reading-three-academic/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingThree />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/reading-three-general/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingThree />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/writing-three/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <WritingThree />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/listening-four/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ListeningFour />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/reading-four/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingFour />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/writing-four/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <WritingFour />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/reading-one-general/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingOne />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/reading-one-academic/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingOneAc />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/reading-two-academic/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingTwoAc />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/reading-two-general/:examId/:testNumber',
                element: (
                    <ProtectedRoute>
                        <ReadingTwo />
                    </ProtectedRoute>
                ),
            },

            // ─── User panel & general routes ─────────────────────────
            {
                path: 'user/user-profile',
                element: (
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/test-dashboard/:examId',
                element: (
                    <ProtectedRoute>
                        <TestDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/courses',
                element: (
                    <ProtectedRoute>
                        <Courses />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/layout',
                element: (
                    <ProtectedRoute>
                        <UserLayout />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/payment',
                element: (
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/test-history',
                element: (
                    <ProtectedRoute>
                        <MockTestResults />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/mocktest-details/:id',
                element: (
                    <ProtectedRoute>
                        <MockTestDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/user/takeTest/:id/:test',
                element: (
                    <ProtectedRoute>
                        <SkillSelection />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user/AllTestPage',
                element: (
                    <ProtectedRoute>
                        <AllTestPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    // Catch-all
    {
        path: '*',
        element: (
            <>
                <GoogleAnalytics />
                <NotFoundPage />
            </>
        ),
    },
]);

