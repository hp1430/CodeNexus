import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LucideLoader2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';

export const SignupDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onLoginClick,
  signupForm,
  setSignupForm,
  validationError,
  error,
  isSuccess,
  isPending,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-500/20 ring-1 ring-white/10 backdrop-blur-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader className="gap-3 pb-3 border-b border-white/10">
            <DialogTitle className="text-2xl text-white">Signup</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your details to create your account.
            </DialogDescription>
          </DialogHeader>

          <br />

          {validationError && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-x-2 text-sm text-red-200 mb-6">
              <TriangleAlert className="size-5 text-red-300" />
              <p>{validationError.message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-x-2 text-sm text-red-200 mb-6">
              <TriangleAlert className="size-5 text-red-300" />
              <p>{error.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex items-center gap-x-2 text-sm text-emerald-200 mb-5">
              <p className="flex items-center">
                Successfully signed up. Enter OTP on next page.
                <LucideLoader2 className="animate-spin ml-2" />
              </p>
            </div>
          )}

          <FieldGroup>
            <Field>
              <Label htmlFor="email-1" className="text-slate-200">
                Email:
              </Label>
              <Input
                id="email-1"
                name="email"
                type="email"
                disabled={isPending}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
                placeholder="Email"
              />
            </Field>

            <Field>
              <Label htmlFor="name-1" className="text-slate-200">
                Name:
              </Label>
              <Input
                id="name-1"
                name="name"
                type="text"
                disabled={isPending}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
                placeholder="Name"
              />
            </Field>

            <Field>
              <Label htmlFor="password-1" className="text-slate-200">
                Password:
              </Label>
              <Input
                id="password-1"
                name="password"
                type="password"
                disabled={isPending}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
                placeholder="Password"
              />
            </Field>

            <Field>
              <Label htmlFor="confirm-password-1">Confirm Password:</Label>

              <div className="relative">
                <Input
                  id="confirm-password-1"
                  name="confirmPassword"
                  type={visible ? 'text' : 'password'}
                  className="pr-10 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
                  disabled={isPending}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                />

                {visible ? (
                  <EyeOff
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </Field>
          </FieldGroup>

          <br />

          <DialogFooter className="bg-slate-950/80 border-white/10">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              disabled={isPending}
            >
              Signup
            </Button>
          </DialogFooter>
        </form>
        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <span
            onClick={onLoginClick}
            className="text-cyan-300 hover:text-cyan-200 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};
