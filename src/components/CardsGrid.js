import React, { Component } from 'react';
import _ from 'lodash';
import Radium from 'radium';
import { compose } from 'redux';
import StackGrid from 'react-stack-grid';
import windowSize from 'react-window-size';

import Card from './Card';

class CardsGrid extends Component {
  width() {
    return this.props.windowWidth <= 320 ? this.props.windowWidth - 40 : 300;
  }

  updateGrid() {
    this.grid.updateLayout();
  }

  render() {
    const {
      cards,
    } = this.props;

    return (
      <div style={styles.container}>
        <StackGrid
          columnWidth={this.width()}
          gutterWidth={20}
          gutterHeight={20}
          monitorImagesLoaded
          duration={0}
          gridRef={grid => this.grid = grid}
        >
          {_.map(cards, (card) => <Card
            updateGrid={() => this.updateGrid()}
            key={card.id}
            width={this.width()}
            data={card}
          />)}
        </StackGrid>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
};

export default compose(
  windowSize,
  Radium,
)(CardsGrid);
