import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContractPage.css';
import SearchBar from '../../components/SearchBar'
import TeamSection from '../../components/TeamSection';
import EditorView from '../../components/EditorView';
import SideBar from '../../components/SideBar';
import { getOne } from '../../redux/actions';
import {negotiationSchema} from '../../redux/middlewares/schemas/schemas';
import ContractBrancher from '../../components/ContractBrancher/ContractBrancher';
// eslint-disable-next-line
class ContractPage extends Component {

  componentDidMount () {
    // will be written out of this.props.match.params
    const content = {}; // eslint-disable-line
    const id = 31;
    const { getOneAct } = this.props;
    const api = {
      route: `negotiations/${id}`,
      schema: negotiationSchema
    }
    getOneAct(api);
  }

  render () {

    const { contract, yourContent, theirContent, yourDetails, theirDetails } = this.props; // eslint-disable-line

    if (contract) {
      if (contract.youEditedLast) {
        this.content = theirContent.content;
      } else {
        this.content = yourContent.content;
      }
    }
    return (
      <div className="main-container">
        <div className="team-section">
          <TeamSection yourDetails={ this.yourDetails || 'No Party' } theirDetails={ this.theirDetails || 'No Party' } />
        </div>
        <div className="contract-display">
          <div className="container-top">
            <div className="title">Contract Editor{ this.contract && this.contract.title }</div>
            <div className="search-bar-section"><SearchBar /></div>
          </div>
          <div className="contract">
            <ContractBrancher {...this.props} />
            <div className="sidebar-controls">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { // eslint-disable-line

  const contract = state.entities.negotiations[31]; //  should be changed to ownProps.match.params.id

  if (contract) {
    const yourDetails = state.entities.parties[contract.yourDetails];
    const theirDetails = state.entities.parties[contract.theirDetails];
    const yourContent = state.entities.proposals[contract.yourContent];
    const theirContent = state.entities.proposals[contract.theirContent];
    return {
      contract,
      yourDetails,
      theirDetails,
      yourContent,
      theirContent
    }
  }
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getOneAct: (api) => dispatch(getOne(api))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractPage);
