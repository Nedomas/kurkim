import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { compose } from 'redux';
import StackGrid from 'react-stack-grid';

import Card from './Card';

class CardsGrid extends Component {
  render() {
    const {
      cards,
    } = this.props;

    return (
      <StackGrid
        columnWidth={300}
        gutterWidth={20}
        gutterHeight={20}
      >
        {_.map(cards, (card) => <Card key={card.id} data={card}/>)}
      </StackGrid>
    );
  }
}

export default compose(
  Radium,
)(CardsGrid);
