interface StepOneProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

export default function StepOne({ formData, handleChange, nextStep }: StepOneProps) {
  // Your existing StepOne component code
} 