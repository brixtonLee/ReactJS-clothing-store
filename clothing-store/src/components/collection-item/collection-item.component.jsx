import React from "react";
import './collection-item.styles.scss';

//Custom Button
import { CustomButton } from "../custom-button/custom-button.component";

//Redux
import { connect } from "react-redux";
import { addCartItem } from "../../redux/cart/cart.actions";


const CollectionItem = ({item, addCartItem}) => {
    const {name, price, imageUrl} = item;
    return(
    <div className="collection-item">
        <div className="image" style={{backgroundImage: `url(${imageUrl})`}}/>
            
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <CustomButton onClick={()=> addCartItem(item)} inverted>ADD TO CART</CustomButton>
    </div>
)}

/* Dispatch is to map the actions to the component, hence it can do the actions to the redux store */
const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch(addCartItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);