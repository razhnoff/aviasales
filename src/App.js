import React, { PureComponent } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { PRIMARY_ACTIVE, PRIMARY } from "./constants";
import logo from "./assets/Logo.png";
import "./App.css";

class App extends PureComponent {
  constructor() {
    super();
    this.init();
    this.state = {};
  }

  init() {
    this.filtersMeta = [
      {
        key: "all",
        value: "Все",
        checked: false,
        onChange: (ev) => {
          console.log(ev.target.checked);
        },
      },
      {
        key: "no_transfer",
        value: "Без пересадок",
        checked: true,
      },
      {
        key: "one_transfer",
        value: "1 пересадка",
        checked: true,
      },
      {
        key: "two_transfer",
        value: "2 пересадки",
        checked: true,
      },
      {
        key: "three_transfer",
        value: "3 пересадки",
        checked: false,
      },
    ];
  }

  fetchSearchId = async () => {
    try {
      const searchIdUrl = "https://front-test.beta.aviasales.ru/search";
      const response = await fetch(searchIdUrl);
      const { searchId } = await response.json();
      this.setState({ searchId });
    } catch (e) {
      console.error(new Error(e));
    }
  };

  queryAll = async () => {
    await this.fetchSearchId();
    this.fetchAllTickets();
  };

  fetchAllTickets = async () => {
    const ticketsUrl = "https://front-test.beta.aviasales.ru/tickets?searchId=";
    const response = await fetch(ticketsUrl + this.state.searchId);
    const { tickets } = await response.json();
    this.setState({ tickets });
  };

  componentDidMount() {
    this.queryAll();
  }

  getFilters = () => {
    return this.filtersMeta.map(({ value, checked, onChange }, id) => {
      return <Input key={id} value={value} onChange={onChange} />;
    });
  };

  buttonsMeta = () => {
    const PRIMATY_ACTIVE_BTN = {
      type: PRIMARY_ACTIVE,
      value: "Самый дешевый",
    };

    const PRIMARY_BTN = {
      type: PRIMARY,
      value: "Самый быстрый",
    };

    return [PRIMATY_ACTIVE_BTN, PRIMARY_BTN];
  };

  getFilterButtons = () => {
    return this.buttonsMeta().map(({ type, value }, key) => {
      return <Button key={key} type={type} value={value} />;
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <a href={"#"} className={"logo"} title={"logo"}>
          <img src={logo} alt={"logo"} />
        </a>
        <div className={"mainWrapper"}>
          <div className={"leftside"}>
            <h1 className={"title"}>Количество пересадок</h1>
            {this.getFilters()}
          </div>
          <div className={"wrapper"}>{this.getFilterButtons()}</div>
        </div>
      </div>
    );
  }
}

export default App;
