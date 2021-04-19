import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import 'react-web-tabs/dist/react-web-tabs.css';

import { covidData } from './API';
import { covidRule } from './API';
import NivoLine from "./component/NivoLine";

function App() {

  const [newCase, setNewCase] = useState();
  const [todayDate, setTodayDate] = useState();
  const [newRule, setNewRule] = useState();

  useEffect(() => {
    (async () => {
      const data = await covidData();
      const rule = await covidRule();
      
      // get new case for today
      const dateFormat = {year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(data[0].date).toLocaleDateString("en-US", dateFormat);
      const todayCase = data[0].new_cases;
      
      // get new rule
      const newReg = rule[0].restriction;

      setNewCase(todayCase);
      setTodayDate(date);
      setNewRule(newReg);

      const ruleTab = document.getElementById("rule");
      const ruleDiv = document.createElement("div");
      ruleTab.appendChild(ruleDiv);
      ruleDiv.innerHTML = newReg;

    })();
  }, []);

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
            <p> {newCase}</p>
          </div>
          </div>
          <br />
          <NivoLine 
            newCase = {newCase}
          />
        </TabPanel>
        <TabPanel tabId="rule">
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
