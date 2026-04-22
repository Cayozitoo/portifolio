import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialSidebar } from './SocialSidebar'
import { config } from '@/lib/config'

describe('SocialSidebar Component', () => {
  it('renders correctly named social links', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
  })

  it('has correct href attributes from config', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('GitHub').closest('a')).toHaveAttribute('href', config.social.github)
    expect(screen.getByLabelText('LinkedIn').closest('a')).toHaveAttribute('href', config.social.linkedin)
    expect(screen.getByLabelText('Instagram').closest('a')).toHaveAttribute('href', config.social.instagram)
  })

  it('does NOT render Twitter logo or link', () => {
    render(<SocialSidebar />)
    expect(screen.queryByLabelText('X')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Twitter')).not.toBeInTheDocument()
  })

  it('renders all links as target="_blank"', () => {
    render(<SocialSidebar />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
