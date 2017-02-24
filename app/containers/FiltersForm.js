import React, { PropTypes, Component } from 'react';
import { reduxForm, Fields } from 'redux-form';
import Form from './Form';
import TemperatureFilterFields from '../components/TemperatureFilterFields';
import Button from '../components/Button';
import { VALIDATE_TEMPERATURE_REGEXP } from '../utils/constants';

const validate = (values) => {
    const errors = {};

    if (values.minTemperature) {
        if (!VALIDATE_TEMPERATURE_REGEXP.test(values.minTemperature)) {
            errors.minTemperature = 'Wrong temperature format';
        }
    }

    if (values.maxTemperature) {
        if (!VALIDATE_TEMPERATURE_REGEXP.test(values.maxTemperature)) {
            errors.maxTemperature = 'Wrong temperature format';
        }
    }

    return errors;
};

class FiltersForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;

        return (
            <Form className={className} onSubmit={handleSubmit} autocompleteOff>
                <div className="container-fluid">
                    <Fields
                      className="row pseudo-paragraph"
                      component={TemperatureFilterFields}
                      prefix="filter"
                      names={['minTemperature', 'maxTemperature']}
                    />
                    <div className="row pseudo-paragraph">
                        <Button type="submit">Apply filters</Button>
                    </div>
                </div>
            </Form>
        );
    }
}

FiltersForm.propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
};

FiltersForm.defaultProps = {
    className: '',
};

export default reduxForm({
    form: 'filtersForm',
    validate,
})(FiltersForm);
