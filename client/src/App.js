import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';

import NivoLine from './component/NivoLine';

function App() {

  const [newCase, setNewCase] = useState();
  const [todayDate, setTodayDate] = useState();
  const [newRule, setNewRule] = useState();

  // get new cases number from data API
  const getDatas = () => {
    axios
      .get('/api/data')
      .then((data) => {
        
        const date = new Date(data.data[0].date);
        date.setDate(date.getDate() + 1);
        const todayCase = data.data[0].new_cases;
        
        setNewCase(todayCase);
        setTodayDate(date.toDateString());
      })
      .catch( err => console.log(err));
  }

  useEffect(() => {
    // get new rule from rule API
    const getRules = () => {
      axios
        .get('/api/rules')
        .then( (rule) => {
          // get new rule
          let newRegHTML = rule.data[0].restriction;
          newRegHTML = newRegHTML.replace(/(?:\n)/g, '<br />');
          newRegHTML = newRegHTML.replace(/(?:\\r\\n|\\r|\\t|\\n)/g, '');
                    
          setNewRule({__html: DOMPurify.sanitize(newRegHTML)})
        })
        .catch( err => console.log(err));
    }
    
    getDatas();
    getRules();

  }, [todayDate]);

  return (
    <div className="App">
      <header className="App-header">
        <p id="staySafe">STAY SAFE</p>
        <p id="subTitle">Covid-19 Daily New Cases and Lastest Regulation for British Colombia</p>
      </header>
      <Tabs defaultTab="data" onChange={(tabId) => { console.log(tabId) }}>
        <TabList>
          <Tab tabFor="data">New Cases</Tab>
          <Tab tabFor="rule">Restriction</Tab>
        </TabList>
        <TabPanel tabId="data">
          <div className="cardOut">
            <div className="card">
              <h3>Last Update</h3>
              <hr />
              <p>{todayDate}</p> 
            </div>
            <div className="card left">
              <h3>Today's New Cases</h3>
              <hr />
              <p>{newCase}</p>
            </div>
            <div className="card left">
              <h3>Vaccinated Number</h3>
              <hr />
              <p>In process</p>
            </div>
          </div>
          <br />
          <NivoLine />
        </TabPanel>
        <TabPanel tabId="rule">
          <div dangerouslySetInnerHTML={newRule}></div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;

