import PropTypes from 'prop-types';
import React, { useState } from 'react';

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div className="p-6 max-w-md mx-auto whitebg- rounded-lg shadow-md mt-6">
      <h3 className="text-4xl font-bold underline text-gray-800 mb-4">
        Hello, {name}!
      </h3>
      <hr className="my-4 border-gray-300" />
      <form className="space-y-4">
        <label
          className="block text-lg font-semibold text-indigo-600"
          htmlFor="name"
        >
          Say hello to:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter a name"
        />
      </form>
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};


export default HelloWorld