import {Switch, Route} from "react-router-dom"
import Profile from "./components/Profile"
import Comments from "./components/Comments"
import Header from "./components/Header"

import {Component} from "react"
import "./app.css"
class App extends Component {
  state={view:true}
  onClickView=()=>{
    this.setState(prevState=>({view:!prevState.view}))
  }
  render(){
    const {view}=this.state
    return(
      <div className="main-container">
        <Header view={view} onClickView={this.onClickView}/>
        <Switch>
          <Route exact path="/" component={Comments} />  
          <Route exact path="/profile" component={Profile}/>
                 
          
                   
        </Switch>
      </div>  
    )
  }
}


export default App
