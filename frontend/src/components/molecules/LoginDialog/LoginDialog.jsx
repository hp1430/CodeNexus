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
            <div className="bg-green-100 border border-green-300 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-800 mb-5">
              <p className="flex items-center">
                Successfully Logged in. You can now close this dialog to
                continue.
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
                className="border-gray-950"
              />
            </Field>

            <Field>
              <Label htmlFor="password-1">Password:</Label>

              <div className="relative">
                <Input
                  id="password-1"
                  name="password"
                  type={visible ? 'text' : 'password'}
                  className="pr-10 border-gray-950" // space for icon
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
              className="cursor-pointer bg-blue-600"
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
