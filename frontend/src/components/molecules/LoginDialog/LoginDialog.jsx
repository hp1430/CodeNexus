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

export const LoginDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onSignupClick,
  validationError,
  error,
  isSuccess,
  isPending,
  loginForm,
  setLoginForm,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-500/20 ring-1 ring-white/10 backdrop-blur-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader className="gap-3 pb-3 border-b border-white/10">
            <DialogTitle className="text-2xl text-white">Login</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your credentials to access your account.
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
                Successfully logged in. You can now close this dialog to
                continue.
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
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    email: e.target.value,
                  });
                }}
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
              />
            </Field>

            <Field>
              <Label htmlFor="password-1" className="text-slate-200">
                Password:
              </Label>

              <div className="relative">
                <Input
                  id="password-1"
                  name="password"
                  type={visible ? 'text' : 'password'}
                  className="pr-10 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
                  disabled={isPending}
                  onChange={(e) => {
                    setLoginForm({
                      ...loginForm,
                      password: e.target.value,
                    });
                  }}
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
              Login
            </Button>
          </DialogFooter>
        </form>
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <span
            onClick={onSignupClick}
            className="text-cyan-300 hover:text-cyan-200 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};
