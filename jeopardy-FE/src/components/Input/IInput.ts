export default interface IInput {
  value?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  text: string;
  disabled?: boolean;
}
