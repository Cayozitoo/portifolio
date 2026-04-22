import { describe, it, expect } from 'vitest'
import { config } from './config'

describe('Application Config', () => {
  it('should have mandatory personal information', () => {
    expect(config.personal.name).toBeDefined()
    expect(config.personal.email).toContain('@')
    expect(config.personal.location).toBeDefined()
  })

  it('should have valid social media URLs', () => {
    expect(config.social.github).toMatch(/^https:\/\/github.com\//)
    expect(config.social.linkedin).toMatch(/^https:\/\/www.linkedin.com\/in\//)
    expect(config.social.instagram).toMatch(/^https:\/\/www.instagram.com\//)
  })

  it('should NOT contain Twitter/X as per requirements', () => {
    expect((config.social as Record<string, unknown>).twitter).toBeUndefined()
  })
})
