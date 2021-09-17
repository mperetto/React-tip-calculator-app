import React from 'react';
import './style/App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayBill: '',
      displayPeople: '',
      tipAmount: '0.00',
      total: '0.00',
      tip: 5,
      customTip: ''
    }

    this.handleChangeBill = this.handleChangeBill.bind(this)
    this.handleChangePeople = this.handleChangePeople.bind(this)
    this.reset = this.reset.bind(this)
    this.calculate = this.calculate.bind(this)
    this.tipChange = this.tipChange.bind(this)
  }

  handleChangeBill(e) {
    const reg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/

    if(e.target.value === '' || reg.test(e.target.value)) {
      this.setState({
        displayBill: e.target.value
      },
      this.calculate)
    }
    
    e.target.value = this.state.displayBill
  }

  handleChangePeople(e) {
    const reg = /^[0-9\b]+$/

    if(e.target.value === '' || reg.test(e.target.value)) {
      this.setState({
        displayPeople: e.target.value
      },
      this.calculate)
    }
    
    e.target.value = this.state.displayPeople
  }

  reset() {
    this.setState({
      displayBill: '',
      displayPeople: '',
      tipAmount: '0.00',
      total: '0.00',
      customTip: ''
    })
  }

  tipChange(e) {

    if(e.target.name === 'custom-tip') {
      if(e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) {
        this.setState({
          tip: e.target.value !== '' ? parseInt(e.target.value) : 5,
          customTip: e.target.value
        },
        this.calculate)
      }
      
      e.target.value = this.state.customTip
    }
    else {
      this.setState({
        tip: parseInt(e.target.value)
      },
      this.calculate)
    }
  }

  calculate() {
    if(this.state.displayBill && this.state.displayPeople) {
      let bill = parseFloat(this.state.displayBill)
      let people = parseInt(this.state.displayPeople)
      let percent = parseInt(this.state.tip)
      let tip = (percent/100)*bill

      this.setState({
        tipAmount: Number((tip / people)).toFixed(2),
        total: Number((bill+tip) / people).toFixed(2)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <h1 className="App__title">Spli<br/>tter</h1>
          <div className="calculator-tip-container">
            <div className="input-container">
              <label htmlFor="amount" className="label-txt">Bill</label>
              <div className="input">
              <span className="material-icons">
                attach_money
              </span>
                <input 
                  type="text" 
                  id="amount" 
                  value={this.state.displayBill} 
                  onChange={
                      this.handleChangeBill
                  }
                  placeholder="0.0" />
              </div>
              <h4>Select Tip %</h4>
              <div className="tip-container">
                <div className="tip">
                  <input type="radio" id="five-percent" value="5" name="tip" onChange={this.tipChange} checked={this.state.tip === 5} />
                  <label htmlFor="five-percent" className="tip__label">5%</label>
                </div>
                <div className="tip">
                  <input type="radio" id="ten-percent" value="10" name="tip" onChange={this.tipChange} checked={this.state.tip === 10} />
                  <label htmlFor="ten-percent" className="tip__label">10%</label>
                </div>
                <div className="tip">
                  <input type="radio" id="fiveteen-percent" value="15" name="tip" onChange={this.tipChange} checked={this.state.tip === 15} />
                  <label htmlFor="fiveteen-percent" className="tip__label">15%</label>
                </div>
                <div className="tip">
                  <input type="radio" id="twentyfive-percent" value="25" name="tip" onChange={this.tipChange} checked={this.state.tip === 25} />
                  <label htmlFor="twentyfive-percent" className="tip__label">25%</label>
                </div>
                <div className="tip">
                  <input type="radio" id="fifty-percent" value="50" name="tip" onChange={this.tipChange} checked={this.state.tip === 50} />
                  <label htmlFor="fifty-percent" className="tip__label">50%</label>
                </div>
                <div className="tit">
                  <input type="text" placeholder="Custom" name="custom-tip" id="custom-tip" value={this.state.customTip} onChange={this.tipChange} />
                </div>
              </div>
              <label htmlFor="people" className="label-txt">Number of People</label>
              <div className="input">
              <span className="material-icons">
                person
              </span>
                <input 
                  type="text" 
                  id="people"
                  value={this.state.displayPeople}
                  onChange={
                      this.handleChangePeople
                  }
                  placeholder="0" />
              </div>
            </div>
            <div className="result-container">
              <div className="results">
                <div className="d-flex f-row space-btw">
                  <div className="text-info">
                    <h4>Tip Amount</h4>
                    <span>/ person</span>
                  </div>
                  <span id="tip-amount" className="result-number">{this.state.tipAmount}$</span>
                </div>
                <div className="d-flex f-row space-btw">
                  <div className="text-info">
                    <h4>Total</h4>
                    <span>/ person</span>
                  </div>
                  <span id="total" className="result-number">{this.state.total}$</span>
                </div>
              </div>
              <button 
                className={`btn-reset ${ (this.state.displayBill === '' && this.state.displayPeople === '') ? 'btn--disabled' : ''}`} 
                onClick={this.reset} 
                disabled={!this.state.displayBill && !this.state.displayPeople}>
                  Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
