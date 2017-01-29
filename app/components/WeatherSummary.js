import React, { PropTypes } from 'react';

function WeatherSummary({ className }, { weather }) {
    return (
        <section className={className}>
            {weather.cod !== 200
                ? (
                    <div className="error-wrapper">
                        <h2>Error: { weather.cod }</h2>
                        <p>{ weather.message }</p>
                    </div>
                )
                : (
                    <div className="success-wrapper">
                        <h1>Weather in { weather.name }</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus mollitia
                            autem error aliquid, ipsam, sequi inventore quisquam, est unde eos a
                            dolorem. Consequuntur, nam perspiciatis praesentium unde nulla
                            necessitatibus iste.
                        </p>
                    </div>
                )
            }
        </section>
    );
}

WeatherSummary.propTypes = {
    className: PropTypes.string,
};

WeatherSummary.defaultProps = {
    className: '',
};

WeatherSummary.contextTypes = {
    weather: PropTypes.object,
};

export default WeatherSummary;
