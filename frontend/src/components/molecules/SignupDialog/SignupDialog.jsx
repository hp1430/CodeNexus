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
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Signup</DialogTitle>
            <DialogDescription>
              Enter your details to create your account.
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
                disabled={isPending}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                className="border-gray-950"
                placeholder="Email"
              />
            </Field>

            <Field>
              <Label htmlFor="name-1">Name:</Label>
              <Input
                id="name-1"
                name="name"
                type="text"
                disabled={isPending}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                className="border-gray-950"
                placeholder="Name"
              />
            </Field>

            <Field>
              <Label htmlFor="password-1">Password:</Label>
              <Input
                id="password-1"
                name="password"
                type="password"
                disabled={isPending}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                className="border-gray-950"
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
                  className="pr-10 border-gray-950" // space for icon
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

          <DialogFooter>
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
              className="cursor-pointer bg-indigo-600"
              disabled={isPending}
            >
              Signup
            </Button>
          </DialogFooter>
        </form>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span
            onClick={onLoginClick}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};
