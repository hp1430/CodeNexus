import { LoginDialog } from '@/components/molecules/LoginDialog/LoginDialog';
import { SignupDialog } from '@/components/molecules/SignupDialog/SignupDialog';
import CTA from '@/components/organisms/Homepage/CtaSection/CtaSection';
import Features from '@/components/organisms/Homepage/FeaturesSection/FeaturesSection';
import Hero from '@/components/organisms/Homepage/HeroSection/HeroSection';
import Navbar from '@/components/organisms/Homepage/Navbar/Navbar';

export default function HomePage({
  isLoginDialogOpen,
  onLoginClick,
  onLoginDialogOpenChange,
  onLoginFormSubmit,
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
        <LoginDialog
          open={isLoginDialogOpen}
          onOpenChange={onLoginDialogOpenChange}
          onSubmit={onLoginFormSubmit}
          onSignupClick={onSignupClick}
        />
      )}
      {isSignupDialogOpen && (
        <SignupDialog
          open={isSignupDialogOpen}
          onOpenChange={onSignupDialogOpenChange}
          onSubmit={() => console.log('Signup form submitted')}
          onLoginClick={onLoginClick}
        />
      )}
    </div>
  );
}
