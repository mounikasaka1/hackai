import styled from '@emotion/styled'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useRef, useState, useEffect } from 'react'
<<<<<<< Updated upstream
import { contacts, messages } from '../data/contacts'
=======
import { Global, css, keyframes } from '@emotion/react'
>>>>>>> Stashed changes

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #14161f;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`

const Sidebar = styled.nav`
  width: 250px;
  min-width: 250px;
  background-color: rgba(20, 22, 31, 0.95);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 16px;
  height: 100%;
  overflow-y: auto;
`

const MainContent = styled.main`
  flex: 1;
  background-color: #14161f;
  padding: 24px 32px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  min-width: 0; /* This prevents flex items from overflowing */
`

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background-color: rgba(20, 22, 31, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ContactPhoto = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #e2e8f0;
  margin-right: 24px;
  flex-shrink: 0;
`

const ContactInfo = styled.div`
  h1 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }
`

const ChartContainer = styled.div`
  background-color: rgba(20, 22, 31, 0.95);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  margin-bottom: 32px;
  overflow: hidden;

  /* Make the chart responsive */
  .recharts-wrapper {
    width: 100% !important;
    height: auto !important;
    min-height: 400px;
    
    .recharts-surface {
      width: 100%;
      height: 100%;
    }
  }
`

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  padding: 24px;
  background-color: rgba(20, 22, 31, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const MessageBubble = styled.div<{ type: 'sent' | 'received' }>`
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 70%;
  align-self: ${props => props.type === 'sent' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.type === 'sent' ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.type === 'sent' ? 'white' : 'rgba(255, 255, 255, 0.9)'};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.type === 'sent' ? 'right: -8px' : 'left: -8px'};
    width: 16px;
    height: 16px;
    background-color: ${props => props.type === 'sent' ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'};
    clip-path: ${props => props.type === 'sent' 
      ? 'polygon(0 0, 0 100%, 100% 100%)' 
      : 'polygon(100% 0, 0 100%, 100% 100%)'};
  }
`

const MessageTime = styled.div<{ messageType: 'sent' | 'received' }>`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
  ${props => props.messageType === 'sent' ? 'text-align: right;' : 'text-align: left;'}
`

const NavItem = styled.div<{ active?: boolean }>`
  padding: 12px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  color: ${props => props.active ? '#7367f0' : 'rgba(255, 255, 255, 0.6)'};
  background-color: ${props => props.active ? 'rgba(115, 103, 240, 0.1)' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(115, 103, 240, 0.1);
    color: #7367f0;
  }
`

const PatternSquaresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
`

const PatternSquare = styled.div<{ isExpanded?: boolean }>`
  background-color: rgba(20, 22, 31, 0.95);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.isExpanded ? 'calc(100vh - 200px)' : '200px'};
  width: ${props => props.isExpanded ? '100%' : 'auto'};
  grid-column: ${props => props.isExpanded ? '1 / -1' : 'auto'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`

const PatternTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`

const PatternDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  text-align: center;
  max-width: 600px;
`

const mockTimelineData = [
  { date: '2024-01', risk: 0.45 },
  { date: '2024-02', risk: 0.62 },
  { date: '2024-03', risk: 0.58 },
  { date: '2024-04', risk: 0.75 },
]

const mockMessages = [
  { id: 1, type: 'received', text: 'Hey, can we talk?' },
  { id: 2, type: 'sent', text: 'Sure, what\'s up?' },
  { id: 3, type: 'received', text: 'I need to discuss something important.' },
]

/**************************************************
 * 1) ANIMATED BACKGROUND BLOBS → UNSHACKLE‑STYLE  *
 **************************************************/
const float1 = keyframes`
  0%   { transform: translate(-15%, -10%) scale(1); }
  50%  { transform: translate(20%,  15%) scale(1.15); }
  100% { transform: translate(-15%, -10%) scale(1); }
`
const float2 = keyframes`
  0%   { transform: translate(10%, 60%)  scale(1); }
  50%  { transform: translate(-25%, 50%) scale(1.25); }
  100% { transform: translate(10%, 60%)  scale(1); }
`
const float3 = keyframes`
  0%   { transform: translate(70%, -30%) scale(1); }
  50%  { transform: translate(50%, 10%)  scale(1.1); }
  100% { transform: translate(70%, -30%) scale(1); }
`

const Blob = styled.div<{
  size: number
  gradient: string
  animation: ReturnType<typeof keyframes>
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background: ${p => p.gradient};
  opacity: 0.5;
  filter: blur(120px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: ${p => p.animation} 30s ease-in-out infinite;
`

const beam1Animation = keyframes`
  0% { transform: translate(-50%, -50%) rotate(45deg); opacity: 0; }
  20% { opacity: 0.3; }
  40% { opacity: 0; }
  100% { transform: translate(50%, 50%) rotate(45deg); opacity: 0; }
`

const beam2Animation = keyframes`
  0% { transform: translate(50%, -50%) rotate(-45deg); opacity: 0; }
  20% { opacity: 0.25; }
  40% { opacity: 0; }
  100% { transform: translate(-50%, 50%) rotate(-45deg); opacity: 0; }
`

const Beam = styled.div<{ delay: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(115, 103, 240, 0.08), rgba(115, 103, 240, 0));
    animation: ${beam1Animation} 20s infinite;
    animation-delay: ${props => props.delay};
    transform-origin: 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(-45deg, rgba(34, 211, 238, 0.08), rgba(34, 211, 238, 0));
    animation: ${beam2Animation} 20s infinite;
    animation-delay: ${props => props.delay};
    transform-origin: 100% 0;
  }
`

const GlobalStyles = () => (
  <Global
    styles={css`
      html, body, #root {
        height: 100%;
        background-color: #14161f;
        background-image: 
          radial-gradient(circle at 0% 0%, rgba(115, 103, 240, 0.1) 0%, rgba(115, 103, 240, 0) 50%),
          radial-gradient(circle at 100% 0%, rgba(34, 211, 238, 0.1) 0%, rgba(34, 211, 238, 0) 50%),
          radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.1) 0%, rgba(244, 114, 182, 0) 50%);
      }
    `}
  />
)

const ContactAnalysis = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null)

  // Calculate chart width based on container width
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(800)

  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.clientWidth - 48
        setChartWidth(width)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const patterns = [
    {
      id: 'obsession',
      title: 'Obsession',
      description: 'Analyze patterns of obsessive behavior and excessive attention.'
    },
    {
      id: 'stalking',
      title: 'Stalking',
      description: 'Identify potential stalking behavior and monitoring patterns.'
    },
    {
      id: 'gaslighting',
      title: 'Gaslighting',
      description: 'Detect manipulative behavior and psychological manipulation attempts.'
    }
  ]

  const handlePatternClick = (patternId: string) => {
    navigate(`/${patternId}/${id}`)
  }

  const contactId = id ? parseInt(id) : 0
  const contact = contacts.find(c => c.id === contactId)
  const contactMessages = messages.filter(m => m.contactId === contact?.phone)

  if (!contact) {
    return <div>Contact not found</div>
  }

  return (
<<<<<<< Updated upstream
    <Container>
      <Sidebar>
        <NavItem 
          active={currentPath === '/dashboard'} 
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </NavItem>
        <NavItem 
          active={currentPath === '/analysis'} 
          onClick={() => navigate('/analysis')}
        >
          Analysis
        </NavItem>
      </Sidebar>
      <MainContent>
        <Content>
          <Header>
            <ContactPhoto />
            <ContactInfo>
              <h1>{contact.name}</h1>
              <p>{contact.phone}</p>
              {contact.email && <p>{contact.email}</p>}
            </ContactInfo>
          </Header>
=======
    <>
      <GlobalStyles />
      <Beam delay="0s" />
      <Beam delay="4s" />
      {/* Blobs behind everything */}
      <Blob
        size={700}
        gradient={
          'radial-gradient(circle at 30% 30%, #7367f0 0%, rgba(115,103,240,0) 70%)'
        }
        animation={float1}
        style={{ top: '-250px', left: '-200px' }}
      />
      <Blob
        size={800}
        gradient={
          'radial-gradient(circle at 70% 30%, #f472b6 0%, rgba(244,114,182,0) 75%)'
        }
        animation={float2}
        style={{ bottom: '-300px', left: '20%' }}
      />
      <Blob
        size={650}
        gradient={
          'radial-gradient(circle at 50% 50%, #22d3ee 0%, rgba(34,211,238,0) 70%)'
        }
        animation={float3}
        style={{ top: '-200px', right: '-200px' }}
      />
>>>>>>> Stashed changes

      <Container>
        <Sidebar>
          <NavItem 
            active={currentPath === '/dashboard'} 
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </NavItem>
          <NavItem 
            active={currentPath === '/analysis'} 
            onClick={() => navigate('/analysis')}
          >
            Analysis
          </NavItem>
        </Sidebar>
        <MainContent>
          <Content>
            <Header>
              <ContactPhoto />
              <ContactInfo>
                <h1>Contact Analysis</h1>
                <p>ID: {id}</p>
              </ContactInfo>
            </Header>

            <ChartContainer ref={chartContainerRef}>
              <LineChart 
                width={chartWidth} 
                height={400} 
                data={mockTimelineData}
                margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
              >
<<<<<<< Updated upstream
                <PatternTitle>{pattern.title}</PatternTitle>
                <PatternDescription>{pattern.description}</PatternDescription>
              </PatternSquare>
            ))}
          </PatternSquaresContainer>

          <MessagesContainer>
            {contactMessages.map(message => (
              <div key={message.id}>
                <MessageBubble type={message.type}>
                  {message.text === '￼' ? '📎 Media attachment' : message.text}
                </MessageBubble>
                <MessageTime messageType={message.type}>
                  {new Date(message.timestamp).toLocaleString()}
                </MessageTime>
              </div>
            ))}
          </MessagesContainer>
        </Content>
      </MainContent>
    </Container>
=======
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255, 255, 255, 0.6)" 
                  tick={{ fill: '#FFFFFF' }}
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.6)"
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  tick={{ fill: '#FFFFFF' }}
                  label={{ 
                    value: 'Risk Level', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: 0, 
                    fill: '#FFFFFF',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Risk Level']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: 'rgba(20, 22, 31, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }}
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                  name="Risk Level"
                />
              </LineChart>
            </ChartContainer>

            <PatternSquaresContainer>
              {patterns.map(pattern => (
                <PatternSquare
                  key={pattern.id}
                  isExpanded={expandedPattern === pattern.id}
                  onClick={() => handlePatternClick(pattern.id)}
                >
                  <PatternTitle>{pattern.title}</PatternTitle>
                  <PatternDescription>{pattern.description}</PatternDescription>
                </PatternSquare>
              ))}
            </PatternSquaresContainer>
          </Content>
        </MainContent>
      </Container>
    </>
>>>>>>> Stashed changes
  )
}

export default ContactAnalysis 