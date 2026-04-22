import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ModernHeader } from './ModernHeader'
import { config } from '@/lib/config'

describe('ModernHeader Component', () => {
  it('renders the developer name as a logo', () => {
    render(<ModernHeader />)
    const expectedLogo = `${config.personal.name.toLowerCase().replace(" ", "")}.dev`
    expect(screen.getByText(expectedLogo)).toBeInTheDocument()
  })

  it('renders translated navigation links', () => {
    render(<ModernHeader />)
    expect(screen.getByText('SOBRE')).toBeInTheDocument()
    expect(screen.getByText('PROJETOS')).toBeInTheDocument()
    expect(screen.getByText('CONTATO')).toBeInTheDocument()
  })

  it('renders the contact email', () => {
    render(<ModernHeader />)
    expect(screen.getByText(config.personal.email)).toBeInTheDocument()
  })

  it('triggers smooth scroll on click', () => {
    const scrollIntoViewMock = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
    
    // Mock document.querySelector to return a fake element
    const mockElement = document.createElement('div')
    mockElement.scrollIntoView = scrollIntoViewMock
    document.querySelector = vi.fn().mockReturnValue(mockElement)

    render(<ModernHeader />)
    const aboutLink = screen.getByText('SOBRE')
    fireEvent.click(aboutLink)

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
  })
})
