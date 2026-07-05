import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';

// Pages
import Dashboard from './pages/Dashboard';
import Spending from './pages/Spending';
import Recommendations from './pages/Recommendations';
import LifeEvents from './pages/LifeEvents';
import Notifications from './pages/Notifications';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hi Arjun! I noticed your salary was credited today (₹85,000). Want me to help you plan this month's savings?",
    timestamp: new Date(Date.now() - 3600000 * 2)
  },
  {
    id: 2,
    sender: 'user',
    text: "Yes, what do you suggest?",
    timestamp: new Date(Date.now() - 3600000 * 1.9)
  },
  {
    id: 3,
    sender: 'bot',
    text: "Based on your spending patterns, I recommend: ₹20k → Recurring Deposit, ₹5k → SIP top-up, ₹10k → Emergency buffer. This leaves you ₹50k for expenses. Sound good?",
    timestamp: new Date(Date.now() - 3600000 * 1.8)
  },
  {
    id: 4,
    sender: 'user',
    text: "Sounds great. What SIP should I pick?",
    timestamp: new Date(Date.now() - 3600000 * 1.7)
  },
  {
    id: 5,
    sender: 'bot',
    text: "Given your moderate risk appetite, I'd recommend **SBI Bluechip Fund**. ₹5,000/month for 5 years grows to ₹3.7L at 12% p.a. Want me to set that up?",
    timestamp: new Date(Date.now() - 3600000 * 1.6)
  }
];

const BOT_RESPONSES = [
  "I noticed your Swiggy spending has increased by 15% this month. Try setting a weekly budget to save more!",
  "Your Emergency Fund is currently at 100% of its target (₹3L). You're in a great position to start investing excess funds.",
  "With your excellent CIBIL score of 762, you are eligible for pre-approved home loan offers with lower interest rates.",
  "Consider upgrading to the SBI SimplyCLICK Credit Card for 10x reward points on online shopping.",
  "Your Liquid Funds are maturing in 5 days. Would you like to reinvest them into a higher-yielding short-term deposit?",
  "Investing in tax-saving ELSS funds can help you save up to ₹46,800 in taxes under Section 80C. Should I show options?",
  "Ensure you have a comprehensive Health Insurance plan. A family floater plan can protect your savings during emergencies.",
  "Setting up an automated monthly sweep-out to a Recurring Deposit is a great way to build disciplined savings."
];

const PAGE_NUDGES = {
  spending: "I see you're looking at your spending. Your food budget is 28% — higher than the 20% ideal.",
  recommendations: "Here are some personalized products matching your risk appetite.",
  portfolio: "Your portfolio has outperformed your savings goal by 2.4%.",
  'life-events': "I've detected 4 key life events. You can dismiss them or review the recommended actions.",
  notifications: "You have unread alerts. Check them to keep your accounts secure and optimized.",
  profile: "Please review your KYC details and linked SBI accounts to ensure seamless transactions."
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const [toggles, setToggles] = useState({
    aiNudges: true,
    spendingAlerts: true,
    productRecs: false
  });
  const [triggeredNudges, setTriggeredNudges] = useState({});
  const [lifeEvents, setLifeEvents] = useState([
    {
      id: 'edu',
      icon: '',
      text: 'Education EMI ending in 2 months — free up ₹8,500/month. Start investing?',
      cta: 'Start SIP',
      alertMsg: 'Setting up new SIP with freed up EMI budget...'
    },
    {
      id: 'wedding',
      icon: '',
      text: 'Wedding-related spending detected. Want to open a joint savings account?',
      cta: 'Open Joint Account',
      alertMsg: 'Opening Joint Savings Account process initiated...'
    },
    {
      id: 'home',
      icon: '',
      text: 'Home loan pre-payment opportunity — you have ₹40k idle in savings',
      cta: 'Prepay Loan',
      alertMsg: 'Proposing home loan prepayment amount...'
    },
    {
      id: 'salary',
      icon: '',
      text: 'Salary hike detected (+15%) — upgrade your SIP by ₹2,000?',
      cta: 'Upgrade SIP',
      alertMsg: 'Upgrading existing SIP by ₹2,000/month...'
    }
  ]);

  const handleToggle = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    if (!toggles.aiNudges) return;

    const nudgeText = PAGE_NUDGES[activePage];
    if (nudgeText && !triggeredNudges[activePage]) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: 'bot',
          text: nudgeText,
          timestamp: new Date()
        }
      ]);
      setTriggeredNudges((prev) => ({
        ...prev,
        [activePage]: true
      }));
    }
  }, [activePage, toggles.aiNudges, triggeredNudges]);

  const handleSendMessage = (text) => {
    const userMessage = {
      id: Date.now() + Math.random(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1 + Math.random(),
          sender: 'bot',
          text: BOT_RESPONSES[responseIndex],
          timestamp: new Date()
        }
      ]);
      setResponseIndex((prevIndex) => (prevIndex + 1) % BOT_RESPONSES.length);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickAction = (action) => {
    let targetPage = 'dashboard';
    let userText = '';
    let botText = '';

    if (action === 'Start SIP') {
      targetPage = 'recommendations';
      userText = 'I want to start a Mutual Fund SIP.';
      botText = 'Great choice! Here are our recommended mutual fund SIPs. I recommend the SBI Mutual Fund SIP matching 94% with your profile.';
    } else if (action === 'Open FD') {
      targetPage = 'recommendations';
      userText = 'I want to open a Fixed Deposit.';
      botText = 'Excellent. You can open a Fixed Deposit right here. The SBI Fixed Deposit offers 6.8% p.a. and is a 97% match.';
    } else if (action === 'Apply for Loan') {
      targetPage = 'recommendations';
      userText = 'I want to apply for a Loan.';
      botText = 'Sure! I can help you apply for an SBI Home Loan, Personal Loan, or Car Loan. You can see your profile data for eligibility.';
    } else if (action === 'Move to RD') {
      targetPage = 'portfolio';
      userText = 'Move ₹20k from my salary to a Recurring Deposit.';
      botText = 'Done! I have initiated moving ₹20,000 to a recurring deposit. You can monitor it in your portfolio tracker.';
    }

    if (userText && botText) {
      setActivePage(targetPage);
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), sender: 'user', text: userText, timestamp: new Date() },
        { id: Date.now() + 1 + Math.random(), sender: 'bot', text: botText, timestamp: new Date() }
      ]);
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onQuickAction={handleQuickAction} />;
      case 'spending':
        return <Spending />;
      case 'recommendations':
        return <Recommendations />;
      case 'life-events':
        return <LifeEvents events={lifeEvents} setEvents={setLifeEvents} />;
      case 'notifications':
        return <Notifications />;
      case 'portfolio':
        return <Portfolio />;
      case 'profile':
        return <Profile toggles={toggles} onToggle={handleToggle} />;
      default:
        return <Dashboard onQuickAction={handleQuickAction} />;
    }
  };

  return (
    <Layout
      sidebar={<Sidebar activePage={activePage} setActivePage={setActivePage} />}
      chatPanel={
        <ChatPanel
          chatMessages={chatMessages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
        />
      }
    >
      {renderActivePage()}
    </Layout>
  );
}
