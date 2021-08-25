import React from "react";
import _ from 'lodash';
import MUIDataTable from "mui-datatables";
import { CircularProgress } from '@material-ui/core';
import { client, getTable } from './graphql';

class App extends React.Component {
  state = {
    page: 0,
    count: 1,
    rowsPerPage: 10,
    sortOrder: {},
    searchText: null,
    filterList: [],
    uniqueCountry: [],
    uniqueMFA: [],
    data: [['Loading Data...']],
    isLoading: false,
  };

  componentDidMount() {
    this.getData();
  }

  getFilter = () => {
    const filters = [];
    this.state.filterList.forEach((filter, index) => {
      if (filter.length) {
        if (index === 2) {
          filters.push({
            field: 'Country',
            value: filter,
          })
        }
        if (index === 5) {
          filters.push({
            field: 'mfa',
            value: filter,
          })
        }
      }
    });
    return filters;
  }

  // get data
  getData = async () => {
    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage;
    const offset = page * rowsPerPage;
    const query = {
      offset,
      limit: offset + rowsPerPage,
    }
    if (!_.isEmpty(this.state.filterList)) {
      query.filters = this.getFilter();
    }
    if (!_.isEmpty(this.state.sortOrder)) {
      query.sort = {
        field: this.state.sortOrder.name,
        ascending: this.state.sortOrder.direction === 'asc'
      };
    }
    if (!_.isEmpty(this.state.searchText)) {
      query.search = this.state.searchText
    }
    this.setState({ isLoading: true });
    const res = await client.query({
      query: getTable,
      variables: {
        query,
      }
    });
    this.setState({
      data: res.data.table.table,
      isLoading: false,
      count: res.data.table.count,
      uniqueCountry: res.data.table.uniqueCountry,
      uniqueMFA: res.data.table.uniqueMFA
    });
  };
  render() {
    const { data , count, rowsPerPage } = this.state;
    
    const columns = [{
      name: "First_Name",
      label: "First Name",
      options: {
       filter: false,
       sort: false,
       search: true
      }
     },
     {
      name: "Last_Name",
      label: "Last Name",
      options: {
       filter: false,
       sort: false,
       search: true
      }
     },
     {
      name: "Country",
      label: "Country",
      options: {
       filter: true,
       filterOptions: {
         names: this.state.uniqueCountry
       },
       sort: false,
       search: false
      }
     },
     {
      name: "email",
      label: "Email",
      options: {
       filter: false,
       sort: false,
       search: false
      }
     },
     {
       name: "dob",
       label: "DOB",
       options: {
        filter: false,
        sort: false,
        search: false
       }
      },
      {
       name: "mfa",
       label: "MFA",
       options: {
        filter: true,
        filterOptions: {
         names: this.state.uniqueMFA
       },
        sort: false,
        search: false
       }
      },
      {
       name: "amt",
       label: "Amount",
       options: {
        filter: false,
        sort: true,
        search: false
       }
      },
      {
       name: "createdDate",
       label: "Created Date",
       options: {
        filter: false,
        sort: true,
        search: false
       }
      },
      {
       name: "ReferredBy",
       label: "ReferredBy",
       options: {
        filter: false,
        sort: false,
        search: false
       }
      },
    ];
    const options = {
      filterType: 'dropdown',
      selectableRows: false,
      serverSide: true,
      count,
      rowsPerPage,
      rowsPerPageOptions: [10, 20, 100],
      onTableChange: (action, tableState) => {
        console.log(action, tableState);
        switch (action) {
          case 'propsUpdate': 
            break;
          default:
            this.setState({
              page: tableState.page,
              sortOrder: tableState.sortOrder,
              filterList: tableState.filterList,
              rowsPerPage: tableState.rowsPerPage,
              searchText: tableState.searchText
            });
            this.getData();
            break;
          }

      },
    };
    return (
      <React.Fragment>
        {this.state.isLoading && (
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <CircularProgress />
          </div>
        )}
        <MUIDataTable title={'Dashboard'} data={data} columns={columns} options={options} />
      </React.Fragment>
    );
  }
}

export default App;