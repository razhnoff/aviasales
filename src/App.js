import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card } from "./components/Card";
import { PRIMARY_ACTIVE, PRIMARY } from "./constants";
import logo from "./assets/Logo.png";
import {
  addSearchId,
  addTickets,
  changeSortByPriceFlag,
  changeSortByTimeFlag,
  addFilterBy3Transfers,
  addFilterBy2Transfers,
  addFilterBy1Transfer,
  addFilterByAllTransfers,
  addFilterByNoTransfers
} from "./store/actions";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  updateButtonsMeta() {
    this.filtersMeta = [
      {
        key: "all",
        value: "Все",
        checked: this.props.isFilteredByAllTranfers,
        onChange: () => {
          this.props.addFilterByAllTransfers({
            isFilteredByAllTranfers: this.props.isFilteredByAllTranfers
          });
        }
      },
      {
        key: "no_transfer",
        value: "Без пересадок",
        checked: this.props.isFilteredByNoTransfers,
        onChange: () => {
          this.props.addFilterByNoTransfers({
            isFilteredByNoTransfers: this.props.isFilteredByNoTransfers
          });
        }
      },
      {
        key: "one_transfer",
        value: "1 пересадка",
        checked: this.props.isFilteredByOneTransfer,
        onChange: () => {
          this.props.addFilterBy1Transfer({
            isFilteredByOneTransfer: this.props.isFilteredByOneTransfer
          });
        }
      },
      {
        key: "two_transfer",
        value: "2 пересадки",
        checked: this.props.isFilteredByTwoTransfers,
        onChange: () => {
          this.props.addFilterBy2Transfers({
            isFilteredByTwoTransfers: this.props.isFilteredByTwoTransfers
          });
        }
      },
      {
        key: "three_transfer",
        value: "3 пересадки",
        checked: this.props.isFilteredByThreeTransfers,
        onChange: () => {
          this.props.addFilterBy3Transfers({
            isFilteredByThreeTransfers: this.props.isFilteredByThreeTransfers
          });
        }
      }
    ];
  }

  fetchSearchId = async () => {
    try {
      const searchIdUrl = "https://front-test.beta.aviasales.ru/search";
      const response = await fetch(searchIdUrl);
      const { searchId } = await response.json();
      this.props.addSearchId({ searchId });
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
      const ticketsUrl = "https://front-test.beta.aviasales.ru/tickets?searchId=";
      const response = await fetch(ticketsUrl + this.props.searchId);
      const { tickets } = await response.json();
      this.props.addTickets({ tickets });
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
      return <Input key={key} value={value} onChange={onChange} checked={checked} />;
    });
  };

  buttonsMeta = () => {
    const FILTER_PRICE_BTN = {
      type: this.props.isSortedByPrice ? PRIMARY_ACTIVE : PRIMARY,
      value: "Самый дешевый",
      onClick: () => {
        this.props.changeSortByPriceFlag({
          isSortedByPrice: this.props.isSortedByPrice
        });
      }
    };

    const FILTER_TIME_BTN = {
      type: this.props.isSortedByTime ? PRIMARY_ACTIVE : PRIMARY,
      value: "Самый быстрый",
      onClick: () => {
        this.props.changeSortByTimeFlag({
          isSortedByTime: this.props.isSortedByTime
        });
      }
    };

    return [FILTER_PRICE_BTN, FILTER_TIME_BTN];
  };

  filterByAllTransfers = ({ segments }, key, arr) => {
    if (!this.props.isFilteredByAllTranfers) {
      return arr;
    }
    const emptyItem = segments.find((item) => item.stops.length === 0);
    return !emptyItem;
  };

  filterByNoTransfers = ({ segments }, key, arr) => {
    if (!this.props.isFilteredByNoTransfers) {
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
    if (!this.props.isFilteredByOneTransfer) {
      return arr;
    }

    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);

    return stopsLength >= 1;
  };

  filterByTwoTransfers = ({ segments }, key, arr) => {
    if (!this.props.isFilteredByTwoTransfers) {
      return arr;
    }

    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);

    return stopsLength >= 2;
  };

  filterByThreeTransfers = ({ segments }, key, arr) => {
    if (!this.props.isFilteredByThreeTransfers) {
      return arr;
    }

    const stopsLength = segments.reduce((acc, curr) => {
      return acc + curr.stops.length;
    }, 0);

    return stopsLength >= 3;
  };

  getCardViews = () => {
    const filteredTickets = this.props.tickets
      .filter(this.filterByNoTransfers)
      .filter(this.filterByAllTransfers)
      .filter(this.filterByThreeTransfers)
      .filter(this.filterByTwoTransfers)
      .filter(this.filterByOneTransfers);

    const sortedByPrice = this.props.isSortedByPrice
      ? [...filteredTickets].sort(sortByPrice)
      : [...filteredTickets];

    const sortedByTime = this.props.isSortedByTime
      ? [...sortedByPrice].sort(sortByTime)
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
        <div className="logo">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" title="logo">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="mainWrapper">
          <div className="leftside">
            <h1 className="title">Количество пересадок</h1>
            {this.getFilters()}
          </div>
          <div className="wrapper">
            {this.getFilterButtons()}
            {this.getCardViews()}
          </div>
        </div>
      </div>
    );
  }
}

const sortByPrice = (a, b) => {
  return a.price - b.price;
};

const sortByTime = (prevItem, nextItem) => {
  const prevItemTime = prevItem.segments.reduce((acc, curr) => {
    return acc + curr.duration;
  }, 0);
  const nextItemTime = nextItem.segments.reduce((acc, curr) => {
    return acc + curr.duration;
  }, 0);
  return prevItemTime > nextItemTime ? 1 : -1;
};

const mapStateToProps = (state) => {
  const {
    searchId,
    tickets,
    isSortedByPrice,
    isSortedByTime,
    isFilteredByNoTransfers,
    isFilteredByAllTranfers,
    isFilteredByOneTransfer,
    isFilteredByTwoTransfers,
    isFilteredByThreeTransfers
  } = state;

  return {
    searchId,
    tickets,
    isSortedByPrice,
    isSortedByTime,
    isFilteredByNoTransfers,
    isFilteredByAllTranfers,
    isFilteredByOneTransfer,
    isFilteredByTwoTransfers,
    isFilteredByThreeTransfers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSearchId: ({ searchId }) => dispatch(addSearchId({ searchId })),
    addTickets: ({ tickets }) => dispatch(addTickets({ tickets })),
    changeSortByPriceFlag: ({ isSortedByPrice }) =>
      dispatch(changeSortByPriceFlag({ isSortedByPrice })),
    changeSortByTimeFlag: ({ isSortedByTime }) =>
      dispatch(changeSortByTimeFlag({ isSortedByTime })),
    addFilterBy3Transfers: ({ isFilteredByThreeTransfers }) =>
      dispatch(addFilterBy3Transfers({ isFilteredByThreeTransfers })),
    addFilterBy2Transfers: ({ isFilteredByTwoTransfers }) =>
      dispatch(addFilterBy2Transfers({ isFilteredByTwoTransfers })),
    addFilterBy1Transfer: ({ isFilteredByOneTransfer }) =>
      dispatch(addFilterBy1Transfer({ isFilteredByOneTransfer })),
    addFilterByAllTransfers: ({ isFilteredByAllTranfers }) =>
      dispatch(addFilterByAllTransfers({ isFilteredByAllTranfers })),
    addFilterByNoTransfers: ({ isFilteredByNoTransfers }) =>
      dispatch(addFilterByNoTransfers({ isFilteredByNoTransfers }))
  };
};

App.propTypes = {
  isSortedByPrice: PropTypes.bool,
  isSortedByTime: PropTypes.bool,
  isFilteredByThreeTransfers: PropTypes.bool,
  isFilteredByTwoTransfers: PropTypes.bool,
  isFilteredByOneTransfer: PropTypes.bool,
  isFilteredByAllTranfers: PropTypes.bool,
  isFilteredByNoTransfers: PropTypes.bool,
  addSearchId: PropTypes.func,
  addTickets: PropTypes.func,
  addFilterByAllTransfers: PropTypes.func,
  addFilterBy2Transfers: PropTypes.func,
  addFilterByNoTransfers: PropTypes.func,
  addFilterBy1Transfer: PropTypes.func,
  addFilterBy3Transfers: PropTypes.func,
  changeSortByTimeFlag: PropTypes.func,
  changeSortByPriceFlag: PropTypes.func,
  tickets: PropTypes.array,
  searchId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
