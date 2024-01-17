// Write your code here
import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timerInMinutes: 25, timerInSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getTimerInSecAndMin = () => {
    const {timerInMinutes, timerInSeconds} = this.state

    // Getting remaining seconds
    const remainingSecondsAre = timerInMinutes * 60 - timerInSeconds

    // getting Minute
    const Minutes = Math.floor(remainingSecondsAre / 60)
    //  getting Seconds
    const Seconds = Math.floor(remainingSecondsAre % 60)

    // if timer is greater then 9 its double digit so we attach 0
    const stringMinutes = Minutes > 9 ? Minutes : `0${Minutes}`
    const stringSeconds = Seconds > 9 ? Seconds : `0${Seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  increaseTimerInSeconds = () => {
    const {timerInMinutes, timerInSeconds} = this.state
    const isTimerComplete = timerInSeconds === timerInMinutes * 6

    //  if is timer Completed / clear interval /negate isTimerRunning
    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onstartOrPauseTheTimer = () => {
    const {timerInMinutes, timerInSeconds, isTimerRunning} = this.state

    //   check weather the timer is completed or not (returns true or false)
    const isTimerComplete = timerInSeconds === timerInMinutes * 60

    //  if true set the timer in seconds to 0
    if (isTimerComplete) {
      this.setState({timerInSeconds: 0})
      console.log('timer is Completed')
    }
    //   if timer is true clear the interval
    if (isTimerRunning) {
      this.clearTimerInterval()
      console.log('cleared the timer interval')
    } else {
      //  if the timer is not running set the interval in seconds
      this.intervalId = setInterval(this.increaseTimerInSeconds, 1000)
      console.log('set the timer interval')
    }
    //  Toggling the state based on the previous isTimerRunning state
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  //  clearing the timer if user clicks on reset button
  onResetTheTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerInMinutes: 25,
      timerInSeconds: 0,
    })
  }

  onRenderChangeTimerController = () => {
    const {isTimerRunning} = this.state
    const statusChangeImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const statusChangeAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const statusChangeText = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="controller-container">
        <div className="status-card">
          <button
            className="control-btn"
            type="button"
            onClick={this.onstartOrPauseTheTimer}
          >
            <img
              src={statusChangeImage}
              alt={statusChangeAltText}
              className="status-icon"
            />
            <h1 className="status-text">{statusChangeText}</h1>
          </button>
        </div>
        <div className="status-card">
          <button
            className="control-btn"
            type="button"
            onClick={this.onResetTheTimer}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="reset-icon"
            />
            <h1 className="status-text">Reset</h1>
          </button>
        </div>
      </div>
    )
  }

  //  Increasing  the count state
  onIncreaseTimer = () => {
    this.setState(prevState => ({
      timerInMinutes: prevState.timerInMinutes + 1,
    }))
  }

  //  Decreasing the count state
  onDecreaseTimer = () => {
    const {timerInMinutes} = this.state

    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  onSetTimerLimitCounter = () => {
    const {timerInMinutes, timerInSeconds} = this.state
    const disabledButton = timerInSeconds > 0

    return (
      <div className="timer-limit-container">
        <p className="timer-limit-heading">Set Timer limit</p>
        <div className="timer-count-container">
          <button
            className="counter-btn"
            type="button"
            disabled={disabledButton}
            onClick={this.onDecreaseTimer}
          >
            -
          </button>
          <div className="count-text-container">
            <p className="count-text">{timerInMinutes}</p>
          </div>
          <button
            className="counter-btn"
            type="button"
            disabled={disabledButton}
            onClick={this.onIncreaseTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const startOrPause = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="display-timer-container">
          <div className="timer-display-container">
            <div className="timer-image-container">
              <div className="timer-container">
                <h1 className="timer-text">{this.getTimerInSecAndMin()}</h1>
                <p className="timer-status">{startOrPause}</p>
              </div>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="controls-container">
              {this.onRenderChangeTimerController()}
              {this.onSetTimerLimitCounter()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
