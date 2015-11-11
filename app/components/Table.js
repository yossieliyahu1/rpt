
"use strict";


var React = require('react/addons');
var DataTable = require('react-data-components').DataTable;



/*
	var columns = [
	  { title: 'Name', prop: 'name'  },
	  { title: 'City', prop: 'city' },
	  { title: 'Address', prop: 'address' },
	  { title: 'Phone', prop: 'phone' }
	];

	var rows = [
	  { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }
	  // It also supports arrays
	  // [ 'name value', 'city value', 'address value', 'phone value' ]
	];

*/

module.exports = React.createClass({

	render:function(){
		return (<DataTable
					  className=""
					  keys={[ '_id' ]}
					  columns={this.props.cols}
					  initialData={this.props.rows}
					  initialPageLength={10}
					  initialSortBy={{ prop: '_id', order: 'descending' }}
					  pageLengthOptions={[ 10, 20, 50, 100 ]}
				/>
				)
    }
})