import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import MobileMenu from './components/Layout/MobileMenu';
import MobileNavbar from './components/Layout/MobileNavbar';
import Dashboard from './components/Dashboard/Dashboard';
import Interns from './components/Sections/Interns';
import Projects from './components/Sections/Projects';
import Kanban from './components/Sections/Kanban';
import Reports from './components/Sections/Reports';
import Settings from './components/Sections/Settings';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listen for navigation events from search
  React.useEffect(() => {
    const handleNavigate = (event: any) => {
      setActiveSection(event.detail);
    };
    
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'interns':
        return <Interns />;
      case 'projects':
        return <Projects />;
      case 'kanban':
        return <Kanban />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Menu Button */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Navbar */}
      <MobileNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20 md:pt-24 px-4 md:px-6 pb-6 ml-0 md:ml-64">
        {renderContent()}
      </main>
    </div>
    </ThemeProvider>
  );
}

export default App;