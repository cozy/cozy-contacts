import React from 'react';
import ContactsContext from './ContactsContext';

const LetterSelector = () => {
  const { setSelectedLetter } = React.useContext(ContactsContext);

  return (
    <div className="letter-select">
      <>
        {'abcdefghijklmnopqrstuvwxyz'.split('').map(e => (
          <div
            className="letter-hover"
            key={e}
            onClick={() => {
              setSelectedLetter(e);
            }}
          >
            {e.toUpperCase()}
          </div>
        ))}
      </>
    </div>
  );
};

export default LetterSelector;
