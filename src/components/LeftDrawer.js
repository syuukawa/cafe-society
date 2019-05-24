import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Sections from './Sections'
import Toolbar from '@material-ui/core/Toolbar'
import SectionList from './sections/SectionList'
import { withStyles } from '@material-ui/core/styles'
import { handleLeftDrawerClose } from '../actions/leftDrawerActions'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubHeader from '@material-ui/core/ListSubHeader'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ListItemText from '@material-ui/core/ListItemText'
import EditIcon from '@material-ui/icons/Edit'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import {Link} from 'react-router-dom'

const mapStateToProps = ({ leftDrawer }) => {
  return {
    leftDrawer: leftDrawer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrawerClose: () => {
      dispatch(handleLeftDrawerClose())
    }
  }
}

const drawerWidth = 240;

export const LeftDrawer = ({ leftDrawer, handleDrawerClose }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={leftDrawer.open}
    >
      <div>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List subheader={<ListSubHeader>Edit Settings</ListSubHeader>}>
        <ListItem onClick={() => handleDrawerClose()} button key='/section-list' component={Link} to='/section-list'>
          <ListItemIcon><EditIcon/></ListItemIcon>
          <ListItemText primary="Sections" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)
