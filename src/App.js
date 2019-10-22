import React, { Component } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.css';

const data = [
  {
    name: 'Finish Tyler M React Tutorial',
    id: 'prj001',
    tasks: [
      {
        name: 'Deploy to netlify',
        id: 'tsk001',
        notes: [
          {
            name: 'Deployment',
            note: 'See if there is any other way to deploy withour netlify',
            id: 'note001',
          }
        ]
      },
      {
        name: 'Project One Task Two',
        id: 'tsk002',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
    ]
  },
  {
    name: 'Project Two',
    id: 'prj002',
    tasks: [
      {
        name: 'Project Two Task One',
        id: 'tsk001',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
      {
        name: 'Project Two Task Two',
        id: 'tsk002',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
    ]
  },
  {
    name: 'Project Three',
    id: 'prj003',
    tasks: [
      {
        name: 'Project Three Task One',
        id: 'tsk001',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
      {
        name: 'Project Three Task Two',
        id: 'tsk002',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
    ]
  },
  {
    name: 'Project Four',
    id: 'prj004',
    tasks: [
      {
        name: 'Project Four Task One',
        id: 'tsk001',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
      {
        name: 'Project Four Task Two',
        id: 'tsk002',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
    ]
  },
  {
    name: 'Project Five',
    id: 'prj005',
    tasks: [
      {
        name: 'Project Five Task One',
        id: 'tsk001',
        notes: [
          {
            name: 'Project Five Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
      {
        name: 'Project Five Task Two',
        id: 'tsk002',
        notes: [
          {
            name: 'Note One',
            note: 'Hello from your first note',
            id: 'note001',
          }
        ]
      },
    ]
  },
]

class MainNav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='projects'
          active={activeItem === 'projects'}
          onClick={this.handleItemClick}
        >
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item
          name='projects'
          active={activeItem === 'projects'}
          onClick={this.handleItemClick}
        >
          <Link to='/projects'>Projects</Link>
        </Menu.Item>
      </Menu>
    )
  }
}


const WelcomePage = () => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    allignItems: 'center'
  }

  return(
    <h1 style={style}>Nested React Router</h1>
  );
}

const Projects = () => {
  return(
    <div>
      <h2>Projects</h2>
      <ul>
        { 
          data.map( (item) => ( <li key={item.id}><Link to={`/projects/${item.id}`}>{item.name} </Link></li> ))
        }
      </ul>
    </div>
  );
}

const Tasks = ({ match }) => {  
  const selectedProject = data.find( ({ id }) => {
    return id === match.params.projectID;
  });

  const tasksList = selectedProject.tasks;

  return(
    <div>
      <h2>{selectedProject.name}</h2>
      <ul>
        { tasksList.map( (item) => {
          console.log(item);
          return(
            <li key={item.id}><Link to={`/projects/${match.params.projectID}/${item.id}`}>{item.name}</Link></li>
          );
          }
        )
        } 
      </ul>
    </div>
  );
}

const Notes = ({ match }) => {
  console.log(match.params);

  const selectedProject = data.find( ({ id }) => {
    return id === match.params.projectID;
  });

  const tasksList = selectedProject.tasks;


  console.log(tasksList, "what is this"); 

  const selectedNotes = tasksList.find( ({ id }) => {
    console.log(id, 'searching notes', match.params.taskID === id);
    return id === match.params.taskID;
  });

  console.log(selectedNotes.notes, "NOTES FOR PROJECT");
  
  

    return(
      <div>
        <h1>{selectedNotes.name}</h1>
        <ul>
          {selectedNotes.notes.map( (item) => (<li><h3>{item.name}</h3><p>{item.note}</p></li>))}
        </ul>
      </div>  
    );
}

const MainView = () => {
  return(
    <div>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Projects />
          </Grid.Column>
          <Grid.Column>
            <Route path='/projects/:projectID' component={Tasks} />         
          </Grid.Column>
          <Grid.Column>
            <Route exact path='/projects/:projectID' render={ () => null } />        
            <Route path='/projects/:projectID/:taskID' component={Notes} />        
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}



function App() {
  return (
    <Router>
      <div className="App">
        <MainNav />
          <Switch>
            <Route exact path='/' component={WelcomePage} />
            <Route path='/projects' component={MainView} />
          </Switch>
      </div>
    </Router>
  );
}


export default App;
