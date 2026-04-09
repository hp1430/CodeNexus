import { LoginDialog } from '@/components/molecules/LoginDialog/LoginDialog';
import { LoginDialogContainer } from '@/components/molecules/LoginDialog/LoginDialogContainer';
import { SignupDialogContainer } from '@/components/molecules/SignupDialog/SignupDialogContainer';
import CTA from '@/components/organisms/Homepage/CtaSection/CtaSection';
import Features from '@/components/organisms/Homepage/FeaturesSection/FeaturesSection';
import Hero from '@/components/organisms/Homepage/HeroSection/HeroSection';
import Navbar from '@/components/organisms/Homepage/Navbar/Navbar';

export default function HomePage({
  isLoginDialogOpen,
  onLoginClick,
  onLoginDialogOpenChange,
  isSignupDialogOpen,
  onSignupClick,
  onSignupDialogOpenChange,
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar onLoginClick={onLoginClick} />
      <Hero />
      <Features />
      <CTA />
      {isLoginDialogOpen && (
        <LoginDialogContainer
          open={isLoginDialogOpen}
          onOpenChange={onLoginDialogOpenChange}
          onSignupClick={onSignupClick}
        />
      )}
      {isSignupDialogOpen && (
        <SignupDialogContainer
          open={isSignupDialogOpen}
          onOpenChange={onSignupDialogOpenChange}
          onLoginClick={onLoginClick}
        />
      )}
    </div>
  );
}
