
import React from 'react';
import AutoSuggest from 'react-autosuggest';
import {FormText} from 'reactstrap';

class FieldAutoSuggest extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filteredSuggestions: [],
    };
  }

  handleFetch = ({ value }) => {
    const { suggestions } = this.props;
    const filteredSuggestions = suggestions.filter(
      ({label}) => label.toLowerCase().startsWith(value.toLowerCase())
    );
    this.setState({ filteredSuggestions });
  }

  handleClear = () => {
    this.setState({ filteredSuggestions: [] });
  }

  handleGetSuggestion = (props) => {
    return props.label;
  }

  handleSuggestionHighlighted = ({ suggestion }) => {
    this.setState({ highlightedSuggestion: suggestion });
  }

  renderSuggestion = (props) => {
    return (
      <span>{props.label}</span>
    );
  }

  handleSuggestionSelected = (event, { suggestionValue, method }) => {
    const { input } = this.props;
    input.onChange(suggestionValue);
    if (method === 'enter') {
      event.preventDefault();
    }
  }

  render () {
    const { input, meta, className } = this.props;
    const {error, touched, warning} = meta;
    const { filteredSuggestions } = this.state;
    const inputClassName = className ? className : "form-control";
    var theme = {
      container: 'react-autosuggest__container',
      containerOpen: 'react-autosuggest__container--open',
      input: touched && error ? inputClassName +  ' is-invalid' : inputClassName,
      suggestionsContainer: 'react-autosuggest__suggestions-container',
      suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
      suggestionsList: 'react-autosuggest__suggestions-list',
      suggestion: 'react-autosuggest__suggestion',
      suggestionFirst: 'react-autosuggest__suggestion--first',
      suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
      sectionContainer: 'react-autosuggest__section-container',
      sectionContainerFirst: 'react-autosuggest__section-container--first',
      sectionTitle: 'react-autosuggest__section-title'
    };


    return (
      <React.Fragment>
        <AutoSuggest
          suggestions={filteredSuggestions}
          onSuggestionsFetchRequested={this.handleFetch}
          onSuggestionsClearRequested={this.handleClear}
          getSuggestionValue={this.handleGetSuggestion}
          renderSuggestion={this.renderSuggestion}
          onSuggestionHighlighted={this.handleSuggestionHighlighted}
          onSuggestionSelected={this.handleSuggestionSelected}
          inputProps={input}
          theme={theme}
        />
        {touched && error && <FormText color="red">{error}</FormText>}
        {touched && warning && <FormText color="warning">{warning}</FormText>}
      </React.Fragment>
    );
  }
}

export default FieldAutoSuggest;