import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  alpha,
  Stack
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedditIcon from '@mui/icons-material/Reddit';
import Logo from '../Logo';

// Neon theme colors
const neonGreen = '#39FF14';
const neonBlue = '#00BFFF';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Roadmap', href: '/roadmap' },
        { name: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Community', href: '/community' },
        { name: 'Learn', href: '/learn' },
        { name: 'API', href: '/api' },
        { name: 'Help Center', href: '/help' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Security', href: '/security' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <TwitterIcon />, href: 'https://twitter.com/strategiz', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/strategiz', label: 'LinkedIn' },
    { icon: <GitHubIcon />, href: 'https://github.com/strategiz', label: 'GitHub' },
    { icon: <RedditIcon />, href: 'https://reddit.com/r/strategiz', label: 'Reddit' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
        backdropFilter: 'blur(10px)',
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {/* Logo and company info */}
          <Box sx={{ flexBasis: { xs: '100%', md: '30%' } }}>
            <Box sx={{ mb: 2 }}>
              <Logo size="medium" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Advanced strategy development and backtesting platform for algorithmic trading and investment strategies.
            </Typography>
            
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton 
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{ 
                    color: neonGreen,
                    '&:hover': {
                      color: alpha(neonGreen, 0.8),
                      boxShadow: `0 0 10px ${neonGreen}`
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <Box 
              key={section.title} 
              sx={{ 
                flexBasis: { xs: '50%', sm: '25%', md: '15%' },
                mb: { xs: 3, md: 0 }
              }}
            >
              <Typography 
                variant="subtitle1" 
                color={neonGreen} 
                sx={{ 
                  mb: 2,
                  fontWeight: 'bold',
                  textShadow: `0 0 5px ${alpha(neonGreen, 0.5)}`
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <Link 
                      href={link.href}
                      underline="hover"
                      sx={{ 
                        color: 'text.secondary',
                        '&:hover': { 
                          color: neonGreen,
                          textShadow: `0 0 5px ${alpha(neonGreen, 0.5)}`
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4, borderColor: alpha(neonGreen, 0.3) }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Strategiz. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ by the Strategiz team
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
