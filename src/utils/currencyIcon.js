import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faEuroSign, faSterlingSign, faLariSign, faTurkishLiraSign, faRubleSign} from "@fortawesome/free-solid-svg-icons";

const CurrencyIcon = ({
  currency,
  size = 40,
  color = '#5e718b',
}) => {
  switch (currency) {
    case 'USD':
      return <FontAwesomeIcon   icon={faDollarSign} className='iconCurrency' />;
    case 'EUR':
        return <FontAwesomeIcon   icon={faEuroSign} className='iconCurrency' />;
    case 'GBP':
        return <FontAwesomeIcon   icon={faSterlingSign} className='iconCurrency' />;
    case 'GEL':
        return <FontAwesomeIcon   icon={faLariSign} className='iconCurrency' />;
    case 'TRY':
        return <FontAwesomeIcon   icon={faTurkishLiraSign} className='iconCurrency' />;
    case 'RUB':
        return <FontAwesomeIcon   icon={faRubleSign} className='iconCurrency' />;
    default:
      return null;
  }
};

export default CurrencyIcon;
