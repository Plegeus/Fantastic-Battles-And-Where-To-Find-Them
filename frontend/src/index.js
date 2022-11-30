
import React from 'react';
import ReactDOM from 'react-dom';

import { send, receive } from './messages/request'

import Top from './elements/top'


receive("/api/login/succes", data => {

});
receive("/api/login/failure", data => {

});


ReactDOM.render(<Top/>, document.getElementById('top_pane'));





