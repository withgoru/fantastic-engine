import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { ContactPage } from '@/pages/contact-page'
import { ProposalPage } from '@/pages/proposal-page'
import { PromptsPage } from '@/pages/prompts-page'
import { RegistrationFlowPage } from '@/pages/registration-flow-page'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<RegistrationFlowPage />} />
          <Route path="/proposal" element={<ProposalPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
