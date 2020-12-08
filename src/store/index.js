import { createStore } from "redux";
import {
  SET_TICKETS,
  SET_SEARCH_ID,
  TIME_SORT,
  PRICE_SORT,
  FILTER_NO_TRANSFERS,
  FILTER_ALL_TRANSFERS,
  FILTER_ONE_TRANSFER,
  FILTER_TWO_TRANSFERS,
  FILTER_THREE_TRANSFERS
} from "../constants";
import {
  setSearchId,
  setTickets,
  setIsSortedByPrice,
  setIsSortedByTime,
  setFilterNoTransfers,
  setFilterAllTransfers,
  setFilter1Transfer,
  setFilter2Transfers,
  setFilter3Transfers
} from "./reducers";

const initState = {
  tickets: [],
  searchId: "",
  isSortedByPrice: false,
  isSortedByTime: false,
  isFilteredByNoTransfers: false,
  isFilteredByAllTranfers: false,
  isFilteredByOneTransfer: false,
  isFilteredByTwoTransfers: false,
  isFilteredByThreeTransfers: false
};

export const store = createStore((state = initState, action) => {
  switch (action.type) {
    case SET_TICKETS:
      return setTickets(state, { tickets: action.tickets });
    case SET_SEARCH_ID:
      return setSearchId(state, { searchId: action.searchId });
    case TIME_SORT:
      return setIsSortedByTime(state, {
        isSortedByTime: action.isSortedByTime
      });
    case PRICE_SORT:
      return setIsSortedByPrice(state, {
        isSortedByPrice: action.isSortedByPrice
      });
    case FILTER_NO_TRANSFERS:
      return setFilterNoTransfers(state, {
        isFilteredByNoTransfers: action.isFilteredByNoTransfers
      });
    case FILTER_ALL_TRANSFERS:
      return setFilterAllTransfers(state, {
        isFilteredByAllTranfers: action.isFilteredByAllTranfers
      });
    case FILTER_ONE_TRANSFER:
      return setFilter1Transfer(state, {
        isFilteredByOneTransfer: action.isFilteredByOneTransfer
      });
    case FILTER_TWO_TRANSFERS:
      return setFilter2Transfers(state, {
        isFilteredByTwoTransfers: action.isFilteredByTwoTransfers
      });
    case FILTER_THREE_TRANSFERS:
      return setFilter3Transfers(state, {
        isFilteredByThreeTransfers: action.isFilteredByThreeTransfers
      });
    default:
      return state;
  }
});
