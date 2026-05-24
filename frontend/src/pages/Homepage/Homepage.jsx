import { JoinRoomDialogContainer } from '@/components/molecules/JoinRoomDialog/JoinRoomDialogContainer';
import { LoginDialogContainer } from '@/components/molecules/LoginDialog/LoginDialogContainer';
import { OTPDialogContainer } from '@/components/molecules/otpDialog/OTPDialogContainer';
import { SignupDialogContainer } from '@/components/molecules/SignupDialog/SignupDialogContainer';
import CTA from '@/components/organisms/Homepage/CtaSection/CtaSection';
import Features from '@/components/organisms/Homepage/FeaturesSection/FeaturesSection';
import Hero from '@/components/organisms/Homepage/HeroSection/HeroSection';
import { HeroSectionContainer } from '@/components/organisms/Homepage/HeroSection/HeroSectionContainer';
import Navbar from '@/components/organisms/Homepage/Navbar/Navbar';

export default function HomePage({
  isLoginDialogOpen,
  onLoginClick,
  onLoginDialogOpenChange,
  isSignupDialogOpen,
  onSignupClick,
  onSignupDialogOpenChange,
  isOtpDialogOpen,
  onOtpDialogOpenChange,
  openOtpDialog,
  isLoggedIn,
  isJoinRoomDialogOpen,
  setJoinRoomDialogOpen,
}) {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar onLoginClick={onLoginClick} isLoggedIn={isLoggedIn} />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-linear-to-b from-cyan-500/15 to-transparent" />
        <HeroSectionContainer
          setLoginDialogOpen={onLoginDialogOpenChange}
          setJoinRoomDialogOpen={setJoinRoomDialogOpen}
        />
      </main>
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
          openOtpDialog={openOtpDialog}
        />
      )}
      {isOtpDialogOpen && (
        <OTPDialogContainer
          open={isOtpDialogOpen}
          onOpenChange={onOtpDialogOpenChange}
        />
      )}
      {isJoinRoomDialogOpen && (
        <JoinRoomDialogContainer
          open={isJoinRoomDialogOpen}
          onOpenChange={setJoinRoomDialogOpen}
        />
      )}
    </div>
  );
}
