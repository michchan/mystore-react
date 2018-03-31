import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SomeScreen as RenderedScreen } from '../../screens';
import {} from '../../actions';

const mapStateToProps = (state, ownProps) => ({ });

const mapDispatchToProps = (dispatch, ownProps) => ({ });

export const SomeScreen = connect(mapStateToProps, mapDispatchToProps)( RenderedScreen );

export default SomeScreen;