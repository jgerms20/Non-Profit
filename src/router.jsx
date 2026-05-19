import { createHashRouter } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/DashboardPage'
import PhasePage from './pages/PhasePage'
import ContactsPage from './pages/ContactsPage'
import MessageGeneratorPage from './pages/MessageGeneratorPage'
import TimelinePage from './pages/TimelinePage'
import LegalStepsPage from './pages/LegalStepsPage'
import CalendarPage from './pages/CalendarPage'
import TodoPage from './pages/TodoPage'
import GrantsPage from './pages/GrantsPage'
import ResourcesPage from './pages/ResourcesPage'
import NamingPage from './pages/NamingPage'
import NotionHubPage from './pages/NotionHubPage'
import MarketIntelPage from './pages/MarketIntelPage'
import CurriculumPage from './pages/CurriculumPage'
import DocsPage from './pages/DocsPage'
import TeamPage from './pages/site/TeamPage'
import ProgramsPage from './pages/site/ProgramsPage'
import LandingPage from './pages/site/LandingPage'
import AboutPage from './pages/site/AboutPage'
import BrandGuidePage from './pages/BrandGuidePage'
import BriefingsPage from './pages/BriefingsPage'
import CurriculumDownloadsPage from './pages/CurriculumDownloadsPage'
import BoardPage from './pages/BoardPage'
import BylawsPage from './pages/BylawsPage'
import ConflictOfInterestPage from './pages/ConflictOfInterestPage'
import SurveyOptionsPage from './pages/SurveyOptionsPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'phase/:phaseNumber', element: <PhasePage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'messages', element: <MessageGeneratorPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'legal', element: <LegalStepsPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'todos', element: <TodoPage /> },
      { path: 'grants', element: <GrantsPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'naming', element: <NamingPage /> },
      { path: 'hub', element: <NotionHubPage /> },
      { path: 'market', element: <MarketIntelPage /> },
      { path: 'curriculum', element: <CurriculumPage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: 'brand', element: <BrandGuidePage /> },
      { path: 'briefings', element: <BriefingsPage /> },
      { path: 'curriculum-downloads', element: <CurriculumDownloadsPage /> },
      { path: 'board', element: <BoardPage /> },
      { path: 'bylaws', element: <BylawsPage /> },
      { path: 'conflict-of-interest', element: <ConflictOfInterestPage /> },
      { path: 'survey-options', element: <SurveyOptionsPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'landing', element: <LandingPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
])
