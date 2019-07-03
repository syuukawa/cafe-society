import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Check, PlaylistAddCheck, VoiceOverOff, DeleteSweep } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { removeArticle, toggleArticle } from '../../actions/articleActions'
import { addFilter} from '../../actions/filterActions'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {parse} from 'tldjs';
import PropTypes from 'prop-types'
import VerticalSpace from '../VerticalSpace'
import { RemoveCircle } from '@material-ui/icons'

const mapStateToProps = ({ selectedSection, articles }) => {
  return {
    selectedSection: selectedSection,
    articles: articles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickShadowBanDomain: (link, selectedSection) => {
      dispatch(addFilter({id: parse(link).domain, text: parse(link).domain, fields: [{id:'link',name:'link',muted:false}], sections: [selectedSection], muted: false, }))
    },
    handleClickRemoveArticle: (article) => {
      dispatch(removeArticle(article))
    },
    handleClickToggleArticle: (article) => {
      dispatch(toggleArticle(article))
    },
    handleClickMarkAllRead: (articles) => {
      articles.map((article) => {
        if (article.muted === false) {
          dispatch(toggleArticle(article))
        }
        return 'o'
      })
    },
    handleClickRemoveAllArticles: (articles) => {
      articles.map((article) => dispatch(removeArticle(article)))
    }
  }
}

export const SectionPage = ({ handleClickShadowBanDomain, handleClickRemoveAllArticles, handleClickRemoveArticle, handleClickMarkAllRead, handleClickToggleArticle, articles, sections, filters, selectedSection}) => {
  const sectionTitle = (selectedSection.id) ? `${selectedSection.id}` : 'enhaanced'
  const deleteSweepTitle = `delete: ${articles.length} articles`
  return (
    <Fragment>
      <VerticalSpace/>
      <Typography variant="h4" >{sectionTitle}     
      </Typography>
      <IconButton title={deleteSweepTitle} onClick={() => {handleClickRemoveAllArticles(articles)}}>
        <DeleteSweep></DeleteSweep>
      </IconButton>
      {articles
        .map((article) => {
        const banDomainTitle = `add ${parse(article.link).domain} to filters`
        return (
          <Grid item xs={12} key={article.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" >
                  <IconButton title="mark article as read" onClick={() => handleClickToggleArticle(article)}>
                    <Check
                      id='checkToggleArticle'
                      style={{ color: 'green' }}
                    />
                  </IconButton>
                  <IconButton title={`delete ${name}`} onClick={() => handleClickRemoveArticle(article)}>
                    <RemoveCircle></RemoveCircle>
                  </IconButton>
                  <a href={article.link} target="cafe-society-article">{article.title}</a>
                  <IconButton title={banDomainTitle} onClick={() => handleClickShadowBanDomain(parse(article.link).domain, selectedSection)} >
                  <VoiceOverOff></VoiceOverOff>
                  </IconButton>
                </Typography>
                <Typography>{article.contentSnippet}</Typography>
                {(!!article.blockReasons) ? <Typography>blockReasons: {JSON.stringify(article.blockReasons)}</Typography>:''}
                <Typography>feed: {JSON.stringify(article.feed)}</Typography>
                {(!!article.muted) ? <Typography>muted: {JSON.stringify(article.muted)}</Typography>:''}
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Fragment>
  )
}

SectionPage.propTypes = {
  selectedSection: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionPage)
