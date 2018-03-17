import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { compose } from 'redux';
import StackGrid from 'react-stack-grid';
import windowSize from 'react-window-size';

import Card from './Card';

class CardsGrid extends Component {
  width() {
    return this.props.windowWidth <= 320 ? '280' : 300;
  }

  render() {
    const {
      cards,
    } = this.props;

    return (
      <StackGrid
        columnWidth={this.width()}
        gutterWidth={20}
        gutterHeight={20}
      >
        {_.map(cards, (card) => <Card key={card.id} width={this.width()} data={card}/>)}
      </StackGrid>
    );
  }
}

export default compose(
  windowSize,
  Radium,
)(CardsGrid);
