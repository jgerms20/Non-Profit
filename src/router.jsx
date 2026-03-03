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
    ],
  },
])
