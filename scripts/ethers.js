let eventFilter = contract.filters.ContractEvent();
let events = await contract.queryFilter(eventFilter);
