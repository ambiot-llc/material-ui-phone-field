/// <reference types="react" />
interface PhoneFieldProps {
    value: string;
    onChange: (value: string) => void;
    defaultCountry?: string;
    fullWidth?: boolean;
    language?: string;
}
declare const PhoneField: ({ value, onChange, defaultCountry, fullWidth, language, }: PhoneFieldProps) => JSX.Element;
export default PhoneField;
