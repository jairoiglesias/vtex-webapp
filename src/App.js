import React from 'react';
import './App.css';

var styles = {
  listItem: {
    padding: '10px'
  },
  buttonState1: {
    color: 'green'
  },
  buttonState2: {
    color: 'red'
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);

    
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.

    this.state = {
      filterText: '',
      contacts: [
        {name: 'OK', phone: 'Cama Box King', email: '10', statusNegotiation: 'Reportar Atraso'},
        {name: 'OK', phone: 'Tenis Nike Tam 38', email: '13', statusNegotiation: 'Reportar Atraso'},
        {name: 'OK', phone: 'Cama Solteiro', email: '2', statusNegotiation: 'Reportar Atraso'},
        {name: 'OK', phone: 'Cortina', email: '3', statusNegotiation: 'Reportar Atraso'},
        
      ]
    }
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);

    setInterval(() => {

      console.log('set interval ...')
    
      // let URL = 'https://proxier.now.sh/http://vtex-api-dev.us-west-2.elasticbeanstalk.com/get_negotiation'
      let URL = 'https://proxier.now.sh/http://hacka-vtex-webapi-dev.us-east-1.elasticbeanstalk.com/get_negotiation'
      
      fetch(URL)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log('get status negotiation', json)
    
        let itemStatusNegotiation = json.status
        
        if(itemStatusNegotiation == 'not'){

          this.setState({
            contacts: [
              {name: 'OK', phone: 'Cama Box King', email: '10', statusNegotiation: 'Reportar Atraso'},
              {name: 'OK', phone: 'Tenis Nike Tam 38', email: '13', statusNegotiation: 'Reportar Atraso'},
              {name: 'OK', phone: 'Cortina', email: '3', statusNegotiation: 'Reportar Atraso'},
              {name: 'OK', phone: 'Mesa', email: '20', statusNegotiation: 'Reportar Atraso'}, 
              // {name: 'OK', phone: 'Cama Solteiro', email: '2', statusNegotiation: 'Reportar Atraso'},
            ]
          })   

        }
        else if(itemStatusNegotiation == 'start'){
          
          this.setState({
            contacts: [
              {name: 'OK', phone: 'Cama Box King', email: '10', statusNegotiation: 'Reportar Atraso'},
              {name: 'OK', phone: 'Tenis Nike Tam 38', email: '13', statusNegotiation: 'Reportar Atraso'},
              {name: 'OK', phone: 'Cortina', email: '3', statusNegotiation: 'Reportar Atraso'},
              {name: 'OK', phone: 'Mesa', email: '20', statusNegotiation: 'Reportar Atraso'}, 
              {name: 'ATENÇÃO', phone: 'Cama Solteiro', email: '2', statusNegotiation: 'Reportar Atraso'},
            ]
          })   

        }
    
      })
    
    }, 2000)
    
  }

  handleButton = async (contact) => {

    console.log('handleButton Invoked!')
    console.log(contact)

    contact.statusNegotiation = 'Acionado !!!'
    
    this.setState({
      filterText: '',
      contacts: [
        {name: 'OK', phone: 'Cama Box King', email: '10', statusNegotiation: 'Reportar Atraso'},
        {name: 'OK', phone: 'Sofá Bege', email: '13', statusNegotiation: 'Reportar Atraso'},
        {name: 'OK', phone: 'Cortina', email: '3', statusNegotiation: 'Reportar Atraso'},
        {name: 'OK', phone: 'Mesa', email: '20', statusNegotiation: 'Reportar Atraso'}, 
        {name: 'ATENÇÃO', phone: 'Cama Solteiro', email: '2', statusNegotiation: 'Acionado'},
      ]
    })

    // const URL = 'https://proxier.now.sh/http://vtex-api-dev.us-west-2.elasticbeanstalk.com/send_sms'
    const URL = 'https://proxier.now.sh/http://hacka-vtex-webapi-dev.us-east-1.elasticbeanstalk.com/send_sms'


    // let response =  await fetch(URL, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "message": "Olá! Aqui é da M & D!\nTemos uma proposta referente a sua encomenda!\nPodemos entregar no proximo dia util?\nCaso voce aceite te daremos 15% na sua compra!",
    //     "phoneNumber": "+5511971801555"
    //   })
    // })

    let response = await fetch(URL)

    response = await response.text()

    console.log(response)

  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }
  
  render() {

    console.log('state', this.state.contacts)
    return (
      <div>
        <h1>Acompanhamento de Pedidos</h1>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <table className='table'>
          <thead>
            <tr>
              <th>Problema</th>
              <th>Status</th>
              <th>Produto</th>
              <th>Quantidade</th>
            </tr>
          </thead>
        

    {
      
      this.state.contacts.map((contact) => {
        // if (contact.name.indexOf(this.state.filterText) === -1) {
        //   return;
        // }
        return (<tr>
        <td style={contact.name == 'ATENÇÃO'? styles.buttonState2 : styles.buttonState1}>{contact.name}</td>
        <td>
          <select>
            <option value="-1">
              Selecione
            </option>
            <option value="0">
              PICKU-UP
            </option>
            <option value="1">
              TRANSPORTADORA
            </option>
          </select>
        </td>
        <td style={{padding: '10px'}}>{contact.phone}</td>
        <td style={{padding: '10px'}}>{contact.email}</td>
        <button style={{padding: '10px', margin: '5px', borderRadius: '10px', backgroundColor: '#5ebccc'}} onClick={() => this.handleButton(contact)}>{contact.statusNegotiation}</button>
        </tr>)
      })
    }
        </table>

      </div>
    );
  }
}


export default App;
