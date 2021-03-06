import React, { Component } from 'react';
import { render } from 'react-dom';
import SidebarList from '../displays/SidebarList';
import { connect } from 'react-redux';
import actions from '../redux/actions'

class RecipeList extends Component {
  render() {
    const state = this.props;

    return (
      <SidebarList
        items={state.recipes}
        onItemClick={id => {
            state.dispatch(actions.selectItem(id));
            state.dispatch(actions.editRecipe(''));
          }
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

export default connect(mapStateToProps)(RecipeList);
