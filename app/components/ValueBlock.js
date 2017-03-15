import React, { PropTypes } from 'react';

function ValueBlock({ className, value, tooltip, valueClass }) {
    return value
    ? (
        <tr className={className}>
            <td>
                { tooltip }
            </td>
            <td>
                { value }
                <span className={valueClass} />
            </td>
        </tr>
    )
    : null;
}

ValueBlock.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.undefined,
    ]).isRequired,
    tooltip: PropTypes.string.isRequired,
    valueClass: PropTypes.string,
};

ValueBlock.defaultProps = {
    className: '',
    valueClass: '',
};

export default ValueBlock;
