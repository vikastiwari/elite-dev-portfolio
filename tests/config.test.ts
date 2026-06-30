import { describe, it, expect } from 'vitest';
import { PORTFOLIO_CONFIG } from '../src/config/portfolio.config';

describe('Portfolio Configuration', () => {
  it('should have required global metadata', () => {
    expect(PORTFOLIO_CONFIG.globalMetadata).toBeDefined();
    expect(typeof PORTFOLIO_CONFIG.globalMetadata.siteName).toBe('string');
  });

  it('should have a personal profile with titles', () => {
    expect(PORTFOLIO_CONFIG.personalProfile.name).toBe('Vikas Tiwari');
    expect(PORTFOLIO_CONFIG.personalProfile.titles.length).toBeGreaterThan(0);
  });

  it('should have a valid theme engine configuration', () => {
    expect(PORTFOLIO_CONFIG.themeEngine.length).toBeGreaterThan(0);
    PORTFOLIO_CONFIG.themeEngine.forEach(theme => {
      expect(theme.id).toBeDefined();
      expect(theme.tokens.primary).toMatch(/^#/); // basic hex validation
      expect(theme.tokens.background).toMatch(/^#/);
    });
  });

  it('should contain a skills array for the tech graph', () => {
    expect(PORTFOLIO_CONFIG.skills).toBeDefined();
    expect(PORTFOLIO_CONFIG.skills.length).toBeGreaterThan(0);
    expect(PORTFOLIO_CONFIG.skills[0].id).toBeDefined();
  });

  it('projects should contain techStack arrays', () => {
    PORTFOLIO_CONFIG.projectMatrix.forEach(project => {
      expect(project.techStack).toBeDefined();
      expect(Array.isArray(project.techStack)).toBe(true);
    });
  });
});
