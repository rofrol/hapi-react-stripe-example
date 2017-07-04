// inspired by http://jamesknelson.com/learn-raw-react-ridiculously-simple-forms/

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var cities = [
  'Warsaw',
  'Washington',
  'Piaseczno',
  'Chicago'
];

const e = React.createElement;

/*
 * Components
 */


function CitiesForm(props) {
  return (
    e('div', { id: 'dropdiv' },
      e('input', {
        type: 'text',
        placeholder: 'City',
        value: props.value.name,
        onChange: props.onChange,
      }),
      e('ul', { id: 'drop' },
        cities.reduce(function (acc, element) {
          var input = props.value.name.toLowerCase();
          if (props.value.name.trim() !== '' && element.toLowerCase().substring(0, input.length) === input) {
            acc.push(e('li', null, element));
          }
          return acc;
        }, [])
      )
    )
  );
}

CitiesForm.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

/*
 * Constants
 */

var SEARCH_TEMPLATE = { name: "" };


/*
 * Actions
 */

function updateSearch(e) {
  setState({ newSearch: { name: e.target.value } });
}

/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    CitiesForm(Object.assign({}, state, {
      value: state.newSearch,
      onChange: updateSearch,
    })),
    document.getElementById('app')
  );
}

// Set initial data
setState({
  newSearch: SEARCH_TEMPLATE,
});
