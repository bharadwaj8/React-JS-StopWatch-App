import {Component} from 'react'
import './index.css'

class StopWatch extends Component {
  state = {minutes: 0, seconds: 0, timerRunning: false}

  componentWillUnmount=()=>{
      this.clearInterval(this.intervalId)
  }

  updateTimer = () => {
    const {minutes, seconds} = this.state

    const updatedSeconds = seconds > 9 ? seconds : `0${seconds}`
    const updatedMinutes = minutes > 9 ? minutes : `0${minutes}`

    return `${updatedMinutes}:${updatedSeconds}`
  }

  increaseTimer = () => {
    const {minutes, seconds} = this.state

    if (seconds >= 59) {
      this.setState(prevState => ({minutes: prevState.minutes + 1, seconds: 0}))
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  clearInterval = () => clearInterval(this.intervalId)

  startTimer = () => {
    const {timerRunning} = this.state
    if (!timerRunning) {
      this.setState({timerRunning: true})
      this.intervalId = setInterval(this.increaseTimer, 1000)
    }
  }

  resetTimer = () => {
    this.setState({minutes: 0, seconds: 0, timerRunning: false})
    this.clearInterval()
  }

  stopTimer = () => {
    const {timerRunning} = this.state
    if (timerRunning) {
      this.setState({timerRunning: false})
      this.clearInterval()
    }
  }

  render() {
    const {minutes, seconds} = this.state
    console.log(minutes, seconds)
    return (
      <div className="bg">
        <h1 className="heading">Stopwatch</h1>
        <div className="card">
          <div className="card-heading">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="logo"
              className="logo"
            />
            <p className="logo-heading">Timer</p>
          </div>
          <h1 className="timer" testid="timer">
            {this.updateTimer()}
          </h1>
          <div className="controls-container">
            <button
              className="button start"
              type="button"
              onClick={this.startTimer}
            >
              Start
            </button>
            <button
              className="button stop"
              type="button"
              onClick={this.stopTimer}
            >
              Stop
            </button>
            <button
              className="reset button"
              type="button"
              onClick={this.resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default StopWatch
