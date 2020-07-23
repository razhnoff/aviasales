import React, { Component } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card } from "./components/Card";
import { PRIMARY_ACTIVE, PRIMARY } from "./constants";
import logo from "./assets/Logo.png";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      filteredTickets: [],
      searchId: "",
      isSortedByPrice: false,
      isSortedByTime: false,
      isFilteredByNoTransfers: false,
      isFilteredByAllTranfers: false,
      isFilteredByOneTransfer: false,
      isFilteredByTwoTransfers: false,
      isFilteredByThreeTransfers: false,
    };
  }

  updateButtonsMeta() {
    this.filtersMeta = [
      {
        key: "all",
        value: "Все",
        checked: this.state.isFilteredByAllTranfers,
        onChange: () => {
          this.setState({
            isFilteredByAllTranfers: !this.state.isFilteredByAllTranfers,
            isFilteredByNoTransfers: false,
          });
        },
      },
      {
        key: "no_transfer",
        value: "Без пересадок",
        checked: this.state.isFilteredByNoTransfers,
        onChange: () => {
          this.setState({
            isFilteredByNoTransfers: !this.state.isFilteredByNoTransfers,
            isFilteredByAllTranfers: false,
            isFilteredByOneTransfer: false,
            isFilteredByTwoTransfers: false,
            isFilteredByThreeTransfers: false,
          });
        },
      },
      {
        key: "one_transfer",
        value: "1 пересадка",
        checked: this.state.isFilteredByOneTransfer,
        onChange: () => {
          this.setState({
            isFilteredByOneTransfer: !this.state.isFilteredByOneTransfer,
            isFilteredByNoTransfers: false,
            isFiltredByAllTranfers: false,
          });
        },
      },
      {
        key: "two_transfer",
        value: "2 пересадки",
        checked: this.state.isFilteredByTwoTransfers,
        onChange: () => {
          this.setState({
            isFilteredByTwoTransfers: !this.state.isFilteredByTwoTransfers,
            isFilteredByNoTransfers: false,
          });
        },
      },
      {
        key: "three_transfer",
        value: "3 пересадки",
        checked: this.state.isFilteredByThreeTransfers,
        onChange: () => {
          this.setState({
            isFilteredByThreeTransfers: !this.state.isFilteredByThreeTransfers,
            isFilteredByNoTransfers: false,
          });
        },
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
      this.fetchSearchId();
      console.error(new Error(e));
    }
  };

  queryAll = async () => {
    await this.fetchSearchId();
    this.fetchAllTickets();
  };

  fetchAllTickets = async () => {
    try {
      const ticketsUrl =
        "https://front-test.beta.aviasales.ru/tickets?searchId=";
      const response = await fetch(ticketsUrl + this.state.searchId);
      const { tickets } = await response.json();
      this.setState({ tickets, isLoading: false, filteredTickets: tickets });
    } catch (e) {
      this.fetchAllTickets();
      console.error(new Error(e));
    }
  };

  componentDidMount() {
    this.queryAll();
  }

  getFilters = () => {
    return this.filtersMeta.map(({ value, checked, onChange }, key) => {
      return (
        <Input key={key} value={value} onChange={onChange} checked={checked} />
      );
    });
  };

  sortByPrice = (a, b) => {
    return a.price - b.price;
  };

  sortByTime = (prevItem, nextItem) => {
    const prevItemTime = prevItem.segments.reduce((acc, curr) => {
      return acc + curr.duration;
    }, 0);
    const nextItemTime = nextItem.segments.reduce((acc, curr) => {
      return acc + curr.duration;
    }, 0);
    return prevItemTime > nextItemTime ? 1 : -1;
  };

  buttonsMeta = () => {
    const FILTER_PRICE_BTN = {
      type: this.state.isSortedByPrice ? PRIMARY_ACTIVE : PRIMARY,
      value: "Самый дешевый",
      onClick: () => {
        this.setState({
          isSortedByPrice: !this.state.isSortedByPrice,
          isSortedByTime: false,
        });
      },
    };

    const FILTER_TIME_BTN = {
      type: this.state.isSortedByTime ? PRIMARY_ACTIVE : PRIMARY,
      value: "Самый быстрый",
      onClick: () => {
        this.setState({
          isSortedByTime: !this.state.isSortedByTime,
          isSortedByPrice: false,
        });
      },
    };

    return [FILTER_PRICE_BTN, FILTER_TIME_BTN];
  };

  filterByAllTransfers = ({ segments }, key, arr) => {
    if (!this.state.isFilteredByAllTranfers) {
      return arr;
    }
    const emptyItem = segments.find((item) => item.stops.length === 0);
    return !emptyItem;
  };

  filterByNoTransfers = ({ segments }, key, arr) => {
    if (!this.state.isFilteredByNoTransfers) {
      return arr;
    }
    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);
    return stopsLength === 0;
  };

  getFilterButtons = () => {
    return this.buttonsMeta().map(({ type, value, onClick }, key) => {
      return <Button key={key} type={type} value={value} onClick={onClick} />;
    });
  };

  filterByOneTransfers = ({ segments }, key, arr) => {
    if (!this.state.isFilteredByOneTransfer) {
      return arr;
    }

    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);

    return stopsLength >= 1;
  };

  filterByTwoTransfers = ({ segments }, key, arr) => {
    if (!this.state.isFilteredByTwoTransfers) {
      return arr;
    }

    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);

    return stopsLength >= 2;
  };

  filterByThreeTransfers = ({ segments }, key, arr) => {
    if (!this.state.isFilteredByThreeTransfers) {
      return arr;
    }

    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);

    return stopsLength >= 3;
  };

  getCardViews = () => {
    const filteredTickets = this.state.tickets
      .filter(this.filterByNoTransfers)
      .filter(this.filterByAllTransfers)
      .filter(this.filterByThreeTransfers)
      .filter(this.filterByTwoTransfers)
      .filter(this.filterByOneTransfers);

    const sortedByPrice = this.state.isSortedByPrice
      ? [...filteredTickets].sort(this.sortByPrice)
      : [...filteredTickets];

    const sortedByTime = this.state.isSortedByTime
      ? [...sortedByPrice].sort(this.sortByTime)
      : [...sortedByPrice];

    return sortedByTime.map((ticket, key) => {
      if (key > 4) {
        // eslint-disable-next-line array-callback-return
        return;
      }

      return <Card key={key} {...ticket} />;
    });
  };

  render() {
    this.updateButtonsMeta();

    return (
      <div className="App">
        <div className={"logo"}>
          <a href={"#"} title={"logo"}>
            <img src={logo} alt={"logo"} />
          </a>
        </div>
        <div className={"mainWrapper"}>
          <div className={"leftside"}>
            <h1 className={"title"}>Количество пересадок</h1>
            {this.getFilters()}
          </div>
          <div className={"wrapper"}>
            {this.getFilterButtons()}
            {this.getCardViews()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
