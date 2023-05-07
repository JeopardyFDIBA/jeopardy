import { DOMAttributes, SetStateAction } from 'react';

export default interface IInput extends DOMAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  text: string;
  disabled?: boolean;
  setChange?: (value: SetStateAction<string>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  shouldBeNumber?: boolean;
}
