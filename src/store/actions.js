import {
  SET_SEARCH_ID,
  SET_TICKETS,
  PRICE_SORT,
  TIME_SORT,
  FILTER_ALL_TRANSFERS,
  FILTER_NO_TRANSFERS,
  FILTER_ONE_TRANSFER,
  FILTER_TWO_TRANSFERS,
  FILTER_THREE_TRANSFERS
} from "../constants";

const addSearchId = ({ searchId }) => {
  return { type: SET_SEARCH_ID, searchId };
};

const addTickets = ({ tickets }) => {
  return { type: SET_TICKETS, tickets };
};

const changeSortByTimeFlag = ({ isSortedByTime }) => {
  return { type: TIME_SORT, isSortedByTime };
};

const changeSortByPriceFlag = ({ isSortedByPrice }) => {
  return { type: PRICE_SORT, isSortedByPrice };
};

const addFilterBy3Transfers = ({ isFilteredByThreeTransfers }) => {
  return { type: FILTER_THREE_TRANSFERS, isFilteredByThreeTransfers };
};

const addFilterBy2Transfers = ({ isFilteredByTwoTransfers }) => {
  return { type: FILTER_TWO_TRANSFERS, isFilteredByTwoTransfers };
};

const addFilterBy1Transfer = ({ isFilteredByOneTransfer }) => {
  return { type: FILTER_ONE_TRANSFER, isFilteredByOneTransfer };
};

const addFilterByAllTransfers = ({ isFilteredByAllTranfers }) => {
  return { type: FILTER_ALL_TRANSFERS, isFilteredByAllTranfers };
};

const addFilterByNoTransfers = ({ isFilteredByNoTransfers }) => {
  return { type: FILTER_NO_TRANSFERS, isFilteredByNoTransfers };
};

export {
  addSearchId,
  addTickets,
  changeSortByTimeFlag,
  changeSortByPriceFlag,
  addFilterBy3Transfers,
  addFilterBy2Transfers,
  addFilterBy1Transfer,
  addFilterByAllTransfers,
  addFilterByNoTransfers
};
