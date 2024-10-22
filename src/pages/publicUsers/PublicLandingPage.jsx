import PropTypes from "prop-types";

import { HeroSection } from "../../components/publicUsers/landing/heroSection/HeroSection";
import { MobileAppSection } from "../../components/publicUsers/landing/mobileAppSection/MobileAppSection";
import { FastestDeliverySection } from "../../components/publicUsers/FastestDeliverySection";
import { CallToAction } from "../../components/publicUsers/CallToAction";
import { useEffect } from "react";

export const PublicLandingPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only on mount
  return (
    <div>
      <HeroSection />
      <MobileAppSection />
      <FastestDeliverySection />
      <CallToAction />
    </div>
  )
}

PublicLandingPage.propTypes = {
  className: PropTypes.string,
};
