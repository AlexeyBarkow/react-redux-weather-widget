import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Button from './Button';
import Tooltip from '../containers/Tooltip';

function SingleFavorite({ className, metric, favorite, weather, forecast, removeHandler }) {
    const remove = () => {
        removeHandler(favorite.index);
    };
    return (
        <section className={classnames(className, 'modal-dialog')}>
            <div className="modal-content">
                <div className="modal-header">
                    <Button className="remove-cross" close onClick={remove}>
                        <Tooltip placement="bottom" tooltipText="Remove from favorites">
                            <span aria-hidden="true">×</span>
                        </Tooltip>
                    </Button>
                    <h4 className="modal-title">
                        {favorite.cityname}, {favorite.countryCode}
                    </h4>
                </div>
                <div className="modal-body">
                    lorem lorem
                </div>
            </div>
        </section>
    );
}

SingleFavorite.propTypes = {
    className: PropTypes.string,
    metric: PropTypes.string.isRequired,
    removeHandler: PropTypes.func.isRequired,
    favorite: PropTypes.object.isRequired,
};

SingleFavorite.defaultProps = {
    className: '',
};

export default SingleFavorite;
