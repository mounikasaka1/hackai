import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #14161f;
`

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
`

const Tagline = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
  text-align: center;
`

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
`

const Button = styled.button`
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`

const SignUpText = styled.p`
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`

const SignUpLink = styled.span`
  color: #3b82f6;
  cursor: pointer;
  margin-left: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  return (
    <Container>
      <Logo>SafeScreen</Logo>
      <Tagline>Understand your communication patterns</Tagline>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit">Sign In</Button>
      </Form>
      <SignUpText>
        Don't have an account?
        <SignUpLink onClick={handleSignUpClick}>Sign Up</SignUpLink>
      </SignUpText>
    </Container>
  )
}

export default Login 