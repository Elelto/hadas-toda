import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import LandingLayout from '../components/LandingLayout';
import { landingPagesData } from '../data/landingPagesData';

const LandingPage = () => {
  const { problemSlug, variant } = useParams();
  
  const pageData = landingPagesData[problemSlug];
  
  if (!pageData) {
    return <Navigate to="/" replace />;
  }

  let normalizedVariant = 'A';
  if (variant) {
    // Strip "variant-" prefix and ".html" suffix, then convert to uppercase
    normalizedVariant = variant.toLowerCase().replace('variant-', '').replace('.html', '').toUpperCase();
  }

  return (
    <>
      <LandingLayout pageData={pageData} variant={normalizedVariant} />
    </>
  );
};

export default LandingPage;
