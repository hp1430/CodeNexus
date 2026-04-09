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
import { FaCheck } from 'react-icons/fa';

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
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account.
            </DialogDescription>
          </DialogHeader>

          <br />

          {validationError && (
            <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-5" />
              <p>{validationError.message}</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-5" />
              <p>{error.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
              <FaCheck className="size-5" />
              <p>
                Successfully signed up. Verify your email id on next page.
                <LucideLoader2 className="animate-spin ml-2" />
              </p>
            </div>
          )}

          <FieldGroup>
            <Field>
              <Label htmlFor="email-1">Email:</Label>
              <Input
                id="email-1"
                name="email"
                type="email"
                disable={isPending}
                onChange={(e) => {
                  setLoginForm({
                    ...loginForm,
                    email: e.target.value,
                  });
                }}
              />
            </Field>

            <Field>
              <Label htmlFor="password-1">Password:</Label>

              <div className="relative">
                <Input
                  id="password-1"
                  name="password"
                  type={visible ? 'text' : 'password'}
                  className="pr-10" // space for icon
                  disable={isPending}
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

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                disable={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disable={isPending}
            >
              Login
            </Button>
          </DialogFooter>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <span
            onClick={onSignupClick}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};
