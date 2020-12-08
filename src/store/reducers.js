const setSearchId = (state, { searchId }) => {
  return {
    ...state,
    searchId
  };
};

const setTickets = (state, { tickets }) => {
  return {
    ...state,
    tickets
  };
};

const setIsSortedByTime = (state, { isSortedByTime }) => {
  return {
    ...state,
    isSortedByTime: !isSortedByTime,
    isSortedByPrice: false
  };
};

const setIsSortedByPrice = (state, { isSortedByPrice }) => {
  return {
    ...state,
    isSortedByPrice: !isSortedByPrice,
    isSortedByTime: false
  };
};

const setFilterNoTransfers = (state, { isFilteredByNoTransfers }) => {
  return {
    ...state,
    isFilteredByNoTransfers: !isFilteredByNoTransfers,
    isFilteredByAllTranfers: false,
    isFilteredByOneTransfer: false,
    isFilteredByTwoTransfers: false,
    isFilteredByThreeTransfers: false
  };
};

const setFilterAllTransfers = (state, { isFilteredByAllTranfers }) => {
  return {
    ...state,
    isFilteredByAllTranfers: !isFilteredByAllTranfers,
    isFilteredByNoTransfers: false
  };
};

const setFilter1Transfer = (state, { isFilteredByOneTransfer }) => {
  return {
    ...state,
    isFilteredByOneTransfer: !isFilteredByOneTransfer,
    isFilteredByNoTransfers: false,
    isFiltredByAllTranfers: false
  };
};

const setFilter2Transfers = (state, { isFilteredByTwoTransfers }) => {
  return {
    ...state,
    isFilteredByTwoTransfers: !isFilteredByTwoTransfers,
    isFilteredByNoTransfers: false
  };
};

const setFilter3Transfers = (state, { isFilteredByThreeTransfers }) => {
  return {
    ...state,
    isFilteredByThreeTransfers: !isFilteredByThreeTransfers,
    isFilteredByNoTransfers: false
  };
};

export {
  setSearchId,
  setTickets,
  setIsSortedByTime,
  setIsSortedByPrice,
  setFilterNoTransfers,
  setFilterAllTransfers,
  setFilter1Transfer,
  setFilter2Transfers,
  setFilter3Transfers
};
