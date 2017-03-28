import React, { PropTypes } from 'react';
import map from 'lodash/map';
import SingleFavorite from './SingleFavorite';
import Draggable from '../containers/connectors/DraggableConnector';
import Droppable from '../containers/connectors/DroppableConnector';

function Favorites({ className, favorites, metric, removeHandler, info, changeFavoriteIndex }) {
    return (
        <div className={className}>
            {
                !favorites || favorites.length === 0
                ? <span>No favorites provided</span>
                : (
                    <div className="row float-fixer">
                        { map(favorites, (curr, index) => {
                            const weather = info[`weather/${curr.cityname}/${curr.countryCode}`] || {};
                            const forecast = info[`forecast/${curr.cityname}/${curr.countryCode}`] || {};
                            const dropRight = (_, dropData) => {
                                if (dropData === index) {
                                    return;
                                }
                                changeFavoriteIndex(dropData, index + 1);
                            };
                            const dropLeft = (_, dropData) => {
                                if (dropData === index) {
                                    return;
                                }
                                changeFavoriteIndex(dropData, index);
                            };

                            return (
                                <Draggable key={`fav-${curr.cityname}-${curr.countryCode}`} className="col-sm-6 col-md-4 col-lg-3 drop-container" dataOnDragStart={index}>
                                    <Droppable onDrop={dropLeft} className="left dropzone" />
                                    <SingleFavorite
                                      index={index}
                                      favorite={curr}
                                      metric={metric}
                                      weather={weather}
                                      removeHandler={removeHandler}
                                      forecast={forecast}
                                    />
                                    <Droppable onDrop={dropRight} className="right dropzone" />
                                </Draggable>
                            );
                        }) }
                    </div>
                )
            }
        </div>
    );
}

Favorites.propTypes = {
    className: PropTypes.string,
    favorites: PropTypes.array,
    metric: PropTypes.string.isRequired,
    removeHandler: PropTypes.func.isRequired,
    info: PropTypes.object,
    changeFavoriteIndex: PropTypes.func.isRequired,
};

Favorites.defaultProps = {
    className: '',
    favorites: [],
    info: {},
};

export default Favorites;
