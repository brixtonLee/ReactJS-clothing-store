import React from "react";
import { MenuItem } from "../menu-item/menu-item.component";

import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect';
import { selectDirectorySections } from "../../redux/directory/directory.selector";
import './directory.styles.scss';
const Directory = ({sections}) => (
        <div className="directory-menu">
            {sections.map(({title, id, imageUrl}) => 
                <MenuItem key={id} title={title} imageUrl = {imageUrl}><Link to={"/shop/" + title}>{title.toUpperCase()}</Link></MenuItem>
            )}
        </div>
    )

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);