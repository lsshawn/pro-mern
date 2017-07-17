import React from 'react';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault(); // prevents default form behavior of doing a GET and refresh page.
    const form = document.forms.issueAdd; //issueAdd is the form name
    this.props.createIssue({ // call the parent method 'createIssue' via callback
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    // clear the form for next input
    form.owner.value = '';
    form.title.value = '';
  }
  
  render() {
    return (
      // onSubmit allows user to hit 'Enter'
      <form name='issueAdd' onSubmit={this.handleSubmit}>
        <input type='text' name='owner' placeholder='Owner'/>
        <input type='text' name='title' placeholder='Title'/>
        <button>Add</button>
      </form>
    )
  }
}