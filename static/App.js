'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var BorderWrap = function (_React$Component) {
  _inherits(BorderWrap, _React$Component);

  function BorderWrap() {
    _classCallCheck(this, BorderWrap);

    return _possibleConstructorReturn(this, (BorderWrap.__proto__ || Object.getPrototypeOf(BorderWrap)).apply(this, arguments));
  }

  _createClass(BorderWrap, [{
    key: 'render',
    value: function render() {
      var borderedStyle = { border: "1px solid silver", padding: 6 };
      return React.createElement(
        'div',
        { style: borderedStyle },
        this.props.children
      );
    }
  }]);

  return BorderWrap;
}(React.Component);

var IssueFilter = function (_React$Component2) {
  _inherits(IssueFilter, _React$Component2);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'Placeholder for IssueFilter'
      );
    }
  }]);

  return IssueFilter;
}(React.Component);

// stateless function. => (return value)


var IssueRow = function IssueRow(props) {
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      props.issue._id
    ),
    React.createElement(
      'td',
      null,
      props.issue.status
    ),
    React.createElement(
      'td',
      null,
      props.issue.owner
    ),
    React.createElement(
      'td',
      null,
      props.issue.created.toDateString()
    ),
    React.createElement(
      'td',
      null,
      props.issue.effort
    ),
    React.createElement(
      'td',
      null,
      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
    ),
    React.createElement(
      'td',
      null,
      props.issue.title
    )
  );
};

// IssueRow.propTypes = {
//   issue_id: React.PropTypes.number.isRequired,
//   issue_title: React.PropTypes.string
// }

// use of {} indicates a return() inside.
function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return React.createElement(IssueRow, { key: issue._id, issue: issue });
  });
  return React.createElement(
    'table',
    { className: 'bordered-table' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'Id'
        ),
        React.createElement(
          'th',
          null,
          'Status'
        ),
        React.createElement(
          'th',
          null,
          'Owner'
        ),
        React.createElement(
          'th',
          null,
          'Created'
        ),
        React.createElement(
          'th',
          null,
          'Effort'
        ),
        React.createElement(
          'th',
          null,
          'Completion Date'
        ),
        React.createElement(
          'th',
          null,
          'Title'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      issueRows
    )
  );
}

var IssueAdd = function (_React$Component3) {
  _inherits(IssueAdd, _React$Component3);

  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    var _this3 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    return _this3;
  }

  _createClass(IssueAdd, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault(); // prevents default form behavior of doing a GET and refresh page.
      var form = document.forms.issueAdd; //issueAdd is the form name
      this.props.createIssue({ // call the parent method 'createIssue' via callback
        owner: form.owner.value,
        title: form.title.value,
        status: 'New',
        created: new Date()
      });
      // clear the form for next input
      form.owner.value = '';
      form.title.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return (
        // onSubmit allows user to hit 'Enter'
        React.createElement(
          'form',
          { name: 'issueAdd', onSubmit: this.handleSubmit },
          React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
          React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
          React.createElement(
            'button',
            null,
            'Add'
          )
        )
      );
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueList = function (_React$Component4) {
  _inherits(IssueList, _React$Component4);

  function IssueList() {
    _classCallCheck(this, IssueList);

    var _this4 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

    _this4.state = { issues: [] };
    _this4.createIssue = _this4.createIssue.bind(_this4);
    return _this4;
  }

  // Lifecycle method hook - load data after component is mounted


  _createClass(IssueList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _this5 = this;

      fetch('/api/issues').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log('Total count of records: ', data._metadata.total_count);
            // forloop to convert string to dates
            data.records.forEach(function (issue) {
              issue.created = new Date(issue.created);
              if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
            });
            _this5.setState({ issues: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert('Failed to fetch issues:' + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: 'createIssue',
    value: function createIssue(newIssue) {
      var _this6 = this;

      fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue)
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (updatedIssue) {
            updatedIssue.created = new Date(updatedIssue.created);
            if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
            // create a copy because state is immutable
            var newIssues = _this6.state.issues.concat(updatedIssue);
            _this6.setState({ issues: newIssues });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to add issue: " + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in sending data to server: " + err.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Issue Tracker'
        ),
        React.createElement(IssueFilter, null),
        React.createElement('hr', null),
        React.createElement(IssueTable, { issues: this.state.issues }),
        React.createElement('hr', null),
        React.createElement(IssueAdd, { createIssue: this.createIssue })
      );
    }
  }]);

  return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the content Node