/// <reference types="react" />
interface PhoneNumberFieldProps {
    value: string;
    onChange: (e: string) => void;
    country: string;
    className?: string;
}
declare function PhoneNumberField({ value, onChange, country, className, }: PhoneNumberFieldProps): JSX.Element;
export default PhoneNumberField;
