import { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
interface CountryProps {
    value: string;
    onChange: (e: ChangeEvent<{
        value: unknown;
    }>) => void;
    displayCountries?: string[];
    language?: string;
}
declare function CountrySelect({ value, onChange, displayCountries, language, }: CountryProps): JSX.Element;
declare namespace CountrySelect {
    var propTypes: {
        value: PropTypes.Requireable<string>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        language: PropTypes.Requireable<string>;
    };
}
export default CountrySelect;
