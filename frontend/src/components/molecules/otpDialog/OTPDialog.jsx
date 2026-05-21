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
  validationError = false,
  error = false,
  isSuccess = false,
  isPending = false,
  otpForm,
  setOtpForm,
  title,
  description,
  label,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    //if (!/^\d?$/.test(value)) return;

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
      <DialogContent className="sm:max-w-sm rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-500/20 ring-1 ring-white/10 backdrop-blur-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader className="gap-3 pb-3 border-b border-white/10">
            <DialogTitle className="text-2xl text-white">{title}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {description}
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
              <p>
                OTP verified successfully. Login after closing the dialog.
                <LucideLoader2 className="animate-spin ml-2" />
              </p>
            </div>
          )}

          <FieldGroup>
            <Field>
              <Label>{label}:</Label>

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
                      className="w-10 h-12 text-center text-lg border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:ring-cyan-300"
                    />
                  ))}
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
              Verify
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
