const contentNode = document.getElementById('contents');

class BorderWrap extends React.Component {
  render() {
    const borderedStyle = {border: "1px solid silver", padding: 6};
    return (
      <div style={borderedStyle}>
        {this.props.children}
      </div>
    )
  }  
}

class IssueFilter extends React.Component {
  render() {
    return (
      <div>Placeholder for IssueFilter</div>
    )
  };
}

// stateless function. => (return value)
const IssueRow = (props) => (
  <tr>
    <td>{props.issue._id}</td> 
    <td>{props.issue.status}</td> 
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td> 
    <td>{props.issue.effort}</td> 
    <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td> 
    <td>{props.issue.title}</td>
  </tr>
)

// IssueRow.propTypes = {
//   issue_id: React.PropTypes.number.isRequired,
//   issue_title: React.PropTypes.string
// }

// use of {} indicates a return() inside.
function IssueTable(props) {
  const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} />);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th> 
          <th>Status</th> 
          <th>Owner</th> 
          <th>Created</th> 
          <th>Effort</th>
          <th>Completion Date</th> 
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );  
}
  

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault(); // prevents default form behavior of doing a GET and refresh page.
    var form = document.forms.issueAdd; //issueAdd is the form name
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


class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] }; 
    this.createIssue = this.createIssue.bind(this);
  }
  
  // Lifecycle method hook - load data after component is mounted
  componentDidMount() {
    this.loadData();
  }
  
  loadData() {
    fetch('/api/issues').then(response =>  {
      if (response.ok) {
        response.json().then(data => {
          console.log('Total count of records: ', data._metadata.total_count);
          // forloop to convert string to dates
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate)
              issue.completionDate = new Date(issue.completionDate);
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          alert('Failed to fetch issues:' + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }
  
  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
        updatedIssue.created = new Date(updatedIssue.created);
        if (updatedIssue.completionDate)
          updatedIssue.completionDate = new Date(updatedIssue.completionDate);
        // create a copy because state is immutable
        const newIssues = this.state.issues.concat(updatedIssue);
        this.setState({ issues: newIssues });
        });
      } else {
        response.json().then(error => {
          alert("Failed to add issue: " + error.message)
        });
      }
    }).catch(err => {
        alert("Error in sending data to server: " + err.message);
    });
  }
   
  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues}/>
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);      // Render the component inside the content Node 