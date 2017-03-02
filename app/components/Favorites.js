import React, { PropTypes } from 'react';
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
                        { favorites.map((curr, index, { length }) => {
                            const weather = info[`weather/${curr.cityname}/${curr.countryCode}`];
                            const forecast = info[`forecast/${curr.cityname}/${curr.countryCode}`];
                            const dropRight = (_, dropData) => {
                                const newIndex = index + 1;
                                console.log(newIndex, dropData)
                                // changeFavoriteIndex(
                                //     dropData,
                                //     newIndex < length ? newIndex : length
                                // );
                            };
                            const dropLeft = (_, dropData) => {
                                const newIndex = index;
                                console.log(newIndex, dropData)
                                // changeFavoriteIndex(dropData, newIndex);
                            };
                            return (
                                <Draggable key={`fav-${index}`} className="col-sm-6 col-md-4 col-lg-3 drop-container" dataOnDragStart={index}>
                                    <Droppable onDrop={dropLeft} className="left dropzone" />
                                    <SingleFavorite
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
