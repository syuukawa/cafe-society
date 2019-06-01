import React from 'react'
import { connect } from 'react-redux'
import { Save } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types'

// import { publishArticles } from '../actions/articleActions'
import { publishContacts } from '../actions/contactActions'
import { publishFeeds } from '../actions/feedActions'
import { publishFilters } from '../actions/filterActions'

const mapStateToProps = ({ contacts, feeds, filters }) => {

  //articles }) => {
  return {
    contacts: contacts,
    // articles: articles,
    feeds: feeds,
    filters: filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePublishToBlockstack: ( contacts, feeds, filters ) => {
      //articles, surpressLinks, surpressTitles, friends, feeds, filters) => {
      //dispatch(publishArticles(articles))
      dispatch(publishContacts(contacts))
      dispatch(publishFeeds(feeds))
      dispatch(publishFilters(filters))
    }
  }
}

const PublishToBlockstack = ({ contacts, feeds, filters, handlePublishToBlockstack}) => {
  // articles, surpressLinks, surpressTitles}) => {
  return (
    <IconButton title="publish to blockstack" onClick={() => handlePublishToBlockstack( contacts, feeds, filters )}>
      <Save></Save>
    </IconButton>
  )
}

PublishToBlockstack.propTypes = {
  contacts: PropTypes.array.isRequired,
  feeds:  PropTypes.array.isRequired,
  filters:  PropTypes.array.isRequired,
  handlePublishToBlockstack: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishToBlockstack)
