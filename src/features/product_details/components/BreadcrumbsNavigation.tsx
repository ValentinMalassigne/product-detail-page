import { Breadcrumbs as MUIBreadcrumbs, Typography, Link as MUILink } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from '../../../types/breadcrumbs';

interface BreadcrumbsNavigationProps {
  breadcrumbs: Breadcrumbs[];
}

function BreadcrumbsNavigation({ breadcrumbs }: BreadcrumbsNavigationProps) {
  const fullBreadcrumbs = [{ label: 'Accueil', url: '/', isBlur: false }, ...breadcrumbs];
  
  return (
    <MUIBreadcrumbs 
      separator={<NavigateNextIcon fontSize="small" />} 
      aria-label="breadcrumb"
      sx={{ mb: 3, textAlign: 'left' }}
    >
      {fullBreadcrumbs.map((breadcrumb, index) => {
        const isLast = index === fullBreadcrumbs.length - 1;
        const isHome = breadcrumb.url === '/';
        
        if (isHome) {
          return (
            <MUILink
              key={index}
              component={Link}
              to={breadcrumb.url}
              color="inherit"
              underline="hover"
              sx={{ 
                opacity: breadcrumb.isBlur ? 0.6 : 1,
                fontWeight: 'regular'
              }}
            >
              {breadcrumb.label}
            </MUILink>
          );
        } else {
          return (
            <Typography 
              key={index} 
              color={isLast ? "text.primary" : "text.secondary"}
              sx={{ 
                fontWeight: isLast ? 'medium' : 'regular',
                opacity: breadcrumb.isBlur ? 0.6 : 1,
                cursor: 'default'
              }}
            >
              {breadcrumb.label}
            </Typography>
          );
        }
      })}
    </MUIBreadcrumbs>
  );
}

export default BreadcrumbsNavigation;