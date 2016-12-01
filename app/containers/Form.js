import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import actions from '../redux/actions';

// Form
// Container component controlling behaviour of a form
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {id:''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const getCurrentRecipe = (received) => {
      const recipe = received.recipes.filter(obj => obj.current === true)[0];
      if (recipe.id === 'Add a new recipe') {
        return {
          ...recipe,
          id: 'Enter the name of the dish',
          ingredients: 'Enter ingredients, separated by commas'
        }
      }
      return recipe;
    }
    const recipe = getCurrentRecipe(this.props);

    this.setState({
      ...recipe,
      id: recipe.id,
      ingredients: recipe.ingredients
    })
  }

  handleChange(event) {
  	if (event.target.name === 'title') {
  	  this.setState({id: event.target.value});
  	}
  	else if (event.target.name === 'ingredients') {
  	  this.setState({ingredients: event.target.value});
  	}
  }
  handleSubmit(currentState) {
    const existing = this.props.recipes.filter(recipe => {
      // prevent overriding other recipes that are not set to be edited
      if (!recipe.edit && recipe.id == currentState.id) {
        return true;
      }
      for (var key in recipe) {
        if (recipe[key] !== currentState[key]) {
          return false;
        }
      }
      return true;
    })

    const newRecipe = Object.assign({}, currentState);

    if (existing.length === 0) {
      this.props.dispatch(actions.addRecipe(newRecipe));
    }
  }

  render() {
    let state = this.state;
    let title = state.id;
    let content = state.ingredients;

    return (
      <div className="contentbar">
        <form>
          <FormTitle name={"title"} value={title} onChange={this.handleChange} />
          <FormContent name={"ingredients"} value={content} onChange={this.handleChange} />
          <input type="button" onClick={() => this.handleSubmit(state)} value="Add" />
        </form>
      </div>
    )
  }
}

// display components
const FormTitle = ({name, value, onChange}) => (
  <div className="form-title">
    <p>Title: </p>
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      />
  </div>
)
const FormContent = ({name, value, onChange}) => (
  <div className="form-content">
    <p>Ingredients: </p>
    <textarea 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      />
  </div>
)

const mapStateToProps = (state => state)

export default connect(mapStateToProps)(Form);