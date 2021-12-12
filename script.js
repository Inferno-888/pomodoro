class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      currentActivity: "Session",
      timeLeft: "",
      running: false,
      style: { }
    }
    
    this.intervalID = null
    
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this)
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this)
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this)
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleStartStop = this.handleStartStop.bind(this)
  }
  
  componentDidMount() {
    this.setState({timeLeft: this.state.sessionLength.toString() + ":00"})
  }
  
  handleBreakDecrement() {
    if(!this.state.running) {
      if(this.state.currentActivity === "Break") {
        if(this.state.breakLength > 1) {
          
          let displayBreak = this.state.breakLength - 1 < 10 ? "0" + (this.state.breakLength - 1).toString() : (this.state.breakLength - 1).toString()
          
          this.setState(prevState => {return {breakLength: prevState.breakLength - 1, timeLeft: displayBreak + ":00"}})
        }
      } else {
        if(this.state.breakLength > 1) {
          this.setState(prevState => {return {breakLength: prevState.breakLength - 1}})
        }
      }
    }
  }
  
  handleBreakIncrement() {
    if(!this.state.running) {
      if(this.state.currentActivity === "Break") {
        if(this.state.breakLength <= 59) {
          
          let displayBreak = this.state.breakLength + 1 < 10 ? "0" + (this.state.breakLength + 1).toString() : (this.state.breakLength + 1).toString()
          
          this.setState(prevState => {return {breakLength: prevState.breakLength + 1, timeLeft: displayBreak + ":00"}})
        }
      } else {
        if(this.state.breakLength <= 59) {
          this.setState(prevState => {return {breakLength: prevState.breakLength + 1}})
        }
      }
    }
  }
  
  handleSessionDecrement() {
    if(!this.state.running) {
      if(this.state.currentActivity === "Session") {
        if(this.state.sessionLength > 1) {
          
          let displaySession = this.state.sessionLength - 1 < 10 ? "0" + (this.state.sessionLength - 1).toString() : (this.state.sessionLength - 1).toString()
          
          this.setState(prevState => {return {sessionLength: prevState.sessionLength - 1, timeLeft: displaySession + ":00"}})
        }
      } else {
        if(this.state.sessionLength > 1) {
          this.setState(prevState => {return {sessionLength: prevState.sessionLength - 1}})
        }
      }
    }
    
  }
  
  handleSessionIncrement() {
    if(!this.state.running) {
      if(this.state.currentActivity === "Session") {
        if(this.state.sessionLength <= 59) {
          
          let displaySession = this.state.sessionLength + 1 < 10 ? "0" + (this.state.sessionLength + 1).toString() : (this.state.sessionLength + 1).toString()
          
          this.setState(prevState => {return {sessionLength: prevState.sessionLength + 1, timeLeft: displaySession + ":00"}})
        }
      } else {
        if(this.state.sessionLength <= 59) {
          this.setState(prevState => {return {sessionLength: prevState.sessionLength + 1}})
        }
      }
    }
  }
  
  handleReset() {
    let beep = document.getElementById("beep")
    beep.pause()
    beep.currentTime = 0
    clearInterval(this.intervalID)
    this.setState({breakLength: 5, sessionLength: 25, currentActivity: "Session", timeLeft: "25:00", running: false, style: { }})
  }
  
  handleStartStop() {
    if(!this.state.running) {
      this.intervalID =  setInterval(() => {
        let time = (parseInt(this.state.timeLeft.substring(0, 2)) * 60) + parseInt(this.state.timeLeft.substring(3, 5))
        time--
        if(time <= 60) {
          this.setState({style: {color: "#a50d0d"}})
        } else {
          this.setState({style: {color: "#676A8B"}})
        }
        if(time < 0) {
          let beep = document.getElementById("beep")
          beep.currentTime = 0
          beep.play()
          if(this.state.currentActivity === "Session") {
            
            let displayBreak = this.state.breakLength < 10 ? "0" + this.state.breakLength.toString() : this.state.breakLength.toString()
            
            this.setState({currentActivity: "Break", timeLeft: displayBreak + ":00", running: true})
            return
          } else {
            
            let displaySession = this.state.sessionLength < 10 ? "0" + this.state.sessionLength.toString() : this.state.sessionLength.toString()
            
            this.setState({currentActivity: "Session", timeLeft: displaySession + ":00", running: true})
            return
          }
        } else {
          let minutes = Math.floor(time / 60)
          let seconds = Math.round(time % 60)
          minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString()
          seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString()
          this.setState({timeLeft: minutes.toString() + ":" + seconds.toString(), running: true})
        }
      }, 1000)
    } else {
      clearInterval(this.intervalID)
      this.setState({running: false})
    }
  }
  
  render() {
    return (
      <div>
        <div id="timer-info" style={this.state.style}>
          <h2 id="timer-label">{this.state.currentActivity}</h2>
          <h2 id="time-left">{this.state.timeLeft}</h2>
        </div>
        <div id="timing-info">
          <div className="timing-info">
            <h3 id="break-label">Break Length</h3>
            <div className="time-control">
              <button id="break-decrement" className="transparentButton" onClick={this.handleBreakDecrement}><i className="fa fa-arrow-down fa-2x"></i></button>
              <h3 id="break-length">{this.state.breakLength}</h3>
              <button id="break-increment" className="transparentButton" onClick={this.handleBreakIncrement}><i className="fa fa-arrow-up fa-2x"></i></button>
            </div>
          </div>
          <div className="timing-info">
            <h3 id="session-label">Session Length</h3>
            <div className="time-control">
              <button id="session-decrement" className="transparentButton" onClick={this.handleSessionDecrement}><i className="fa fa-arrow-down fa-2x"></i></button>
              <h3 id="session-length">{this.state.sessionLength}</h3>
              <button id="session-increment" className="transparentButton" onClick={this.handleSessionIncrement}><i className="fa fa-arrow-up fa-2x"></i></button>
            </div>
          </div>
        </div>
        <div id="time-control2">
          <button id="start_stop" className="transparentButton" onClick={this.handleStartStop}><i className="fa fa-play fa-2x"></i><i className="fa fa-pause fa-2x"></i></button>
          <button id="reset" className="transparentButton" onClick={this.handleReset}><i className="fa fa-sync-alt fa-2x"></i></button>
        </div>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"))
