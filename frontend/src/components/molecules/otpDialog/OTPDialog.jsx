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
import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { useRef } from 'react';

export const OTPDialog = ({
  open,
  onOpenChange,
  onSubmit,
  validationError,
  error,
  isSuccess,
  isPending,
  otpForm,
  setOtpForm,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = otpForm.otp.split('');
    newOtp[index] = value;
    setOtpForm({ ...otpForm, otp: newOtp.join('') });

    // move forward
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otpForm.otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              Enter the OTP sent to your email.
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
              <p>
                OTP verified successfully. Login after closing the dialog.
                <LucideLoader2 className="animate-spin ml-2" />
              </p>
            </div>
          )}

          <FieldGroup>
            <Field>
              <Label>OTP:</Label>

              <div className="flex justify-between gap-2 mt-2">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={otpForm.otp?.[index] || ''}
                      disabled={isPending}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      className="w-10 h-12 text-center text-lg border-gray-950"
                    />
                  ))}
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
              className="cursor-pointer bg-blue-600"
              disabled={isPending}
            >
              Verify
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
