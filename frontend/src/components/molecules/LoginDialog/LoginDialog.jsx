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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const LoginDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onSignupClick,
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

          <FieldGroup>
            <Field>
              <Label htmlFor="email-1">Email:</Label>
              <Input id="email-1" name="email" type="email" />
            </Field>

            <Field>
              <Label htmlFor="password-1">Password:</Label>

              <div className="relative">
                <Input
                  id="password-1"
                  name="password"
                  type={visible ? 'text' : 'password'}
                  className="pr-10" // space for icon
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
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
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
