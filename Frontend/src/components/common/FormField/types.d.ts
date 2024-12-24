export interface IRenderInputProps {
  register: any;
  type?: string | 'text';
  containerClasses?: string;
  inputClasses?: string;
  disabled?: boolean;
  children?: any;
  errorClasses?: string;
  labelClasses?: string;
  placeholder?: string;
  labelName: string;
  containerClass?: string | '';
  inputClass?: string | '';
  errorClass?: string | '';
  errorMessage?: any;
  formState?: {
    errors: any;
    touchedFields: any;
  };
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
}

export interface IRenderSelectInputProps extends IRenderInputProps {
  options: IPostDropdown[];
  control: any;
}
