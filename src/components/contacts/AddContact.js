import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Add } from '@material-ui/icons'
import { addContact, updateContact} from '../../actions/contactActions'
import IconButton from '@material-ui/core/IconButton'

const mapStateToProps = ({contact}) => {
  if (!contact) {
    return {name: ''}
  }
  return {
    name: contact.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickAddContact: (name) => {
      dispatch(addContact(name))
      dispatch(updateContact(''))
    },
    handleInputChange: (evt) => {
      const name = evt.target.value
      dispatch(updateContact(name))
    }
  }
}

const AddContact = ({ handleClickAddContact, handleInputChange, name }) => {
  return (
    <Fragment>
      <IconButton title="add new contact" onClick={() => handleClickAddContact(name)} >
        <Add id='addContact' />
      </IconButton>
      <TextField
        label='enter blockstack id'
        id='textFieldContact'
        onChange={handleInputChange}
        value={name}
        placeholder="cole_albon.id"
      />
    </Fragment>
  )
}

AddContact.propTypes = {
  handleClickAddContact: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)
